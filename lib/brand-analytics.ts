import { useEffect } from 'react';

/**
 * Interface para dados de contato com representante
 */
interface RepContactData {
  name: string;
  specialty: string;
  crm: string;
  clinic: string;
  question: string;
}

/**
 * Sistema de Analytics para Sucrafilm
 * Rastreia engajamento médico e conversões
 */
export const brandAnalytics = {
  /**
   * Rastreia visualização de seção de posologia
   * Evento crítico - médico está consultando dosagem
   */
  trackPosologyView: (timeSpent: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'posology_view', {
        event_category: 'Medical Content',
        event_label: 'Dosage Information',
        value: timeSpent,
        time_spent: timeSpent,
      });

      console.log('✅ Analytics: Posologia visualizada', { timeSpent });
    }
  },

  /**
   * Rastreia contato com representante
   * LEAD QUENTE - médico demonstrou interesse
   */
  trackRepContact: (data: RepContactData) => {
    if (typeof window !== 'undefined' && window.gtag) {
      const leadScore = calculateLeadScore(data);

      window.gtag('event', 'rep_contact', {
        event_category: 'Lead Generation',
        event_label: data.specialty || 'specialty_not_provided',
        value: leadScore,
        has_name: !!data.name,
        has_specialty: !!data.specialty,
        has_crm: !!data.crm,
        has_clinic: !!data.clinic,
        question_length: data.question.length,
        lead_score: leadScore,
      });

      // Conversão de Lead
      window.gtag('event', 'generate_lead', {
        event_category: 'Conversion',
        event_label: 'whatsapp_contact_sucrafilm',
        value: leadScore,
      });

      console.log('🎯 Analytics: Contato com representante (LEAD)', {
        leadScore,
        data,
      });
    }
  },

  /**
   * Rastreia downloads de materiais
   */
  trackDownload: (fileName: string, fileType: string = 'PDF') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'file_download', {
        event_category: 'Content Download',
        event_label: fileName,
        file_type: fileType,
        value: 3,
      });

      console.log('📥 Analytics: Download', fileName);
    }
  },

  /**
   * Rastreia profundidade de scroll
   */
  trackScrollDepth: (percentage: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      if ([25, 50, 75, 100].includes(percentage)) {
        window.gtag('event', 'scroll_depth', {
          event_category: 'Engagement',
          event_label: `${percentage}%`,
          value: percentage,
          non_interaction: percentage < 75,
        });

        console.log(`📜 Analytics: Scroll ${percentage}%`);
      }
    }
  },

  /**
   * Rastreia compartilhamento
   */
  trackShare: (method: string = 'unknown') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        event_category: 'Social',
        event_label: method,
        value: 5,
      });

      console.log('🔗 Analytics: Compartilhamento', method);
    }
  },

  /**
   * Rastreia acesso via QR Code
   */
  trackQRAccess: () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'qr_code_access', {
        event_category: 'Brand Engagement',
        event_label: 'Doctor accessed via QR Code - Sucrafilm',
        value: 2,
      });

      console.log('📱 Analytics: Acesso via QR Code');
    }
  },

  /**
   * Rastreia visualização de curso/webinar
   */
  trackCourseClick: (courseName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'course_click', {
        event_category: 'Education',
        event_label: courseName,
        value: 4,
      });

      console.log('🎓 Analytics: Click em curso', courseName);
    }
  },

  /**
   * Rastreia engajamento com evidências científicas
   */
  trackEvidenceEngagement: (sectionName: string, timeSpent: number) => {
    if (typeof window !== 'undefined' && window.gtag && timeSpent > 5) {
      window.gtag('event', 'evidence_engagement', {
        event_category: 'Scientific Content',
        event_label: sectionName,
        value: timeSpent,
        time_spent: timeSpent,
      });

      console.log('📊 Analytics: Engajamento com evidências', {
        sectionName,
        timeSpent,
      });
    }
  },
};

/**
 * Calcula score de qualidade do lead
 */
function calculateLeadScore(data: RepContactData): number {
  let score = 10; // Base

  if (data.name) score += 5;
  if (data.specialty) score += 10;
  if (data.crm) score += 15; // CRM é forte indicador
  if (data.clinic) score += 10;
  if (data.question.length > 50) score += 10;
  if (data.question.length > 150) score += 10;

  return score;
}

/**
 * Hook React para rastrear visualização de seção
 */
export const useSectionTracking = (sectionName: string) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'section_view', {
              event_category: 'Content Engagement',
              event_label: sectionName,
              non_interaction: true,
            });

            console.log(`👁️ Analytics: Seção visualizada - ${sectionName}`);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px',
      }
    );

    const element = document.getElementById(sectionName);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [sectionName]);
};

/**
 * Hook para rastrear tempo na página
 */
export const useTimeTracking = (pageName: string) => {
  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);

      if (timeSpent > 10 && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'time_on_page', {
          event_category: 'Engagement',
          event_label: pageName,
          value: timeSpent,
        });

        console.log(`⏱️ Analytics: Tempo na página ${pageName}: ${timeSpent}s`);
      }
    };
  }, [pageName]);
};

/**
 * TypeScript declarations
 */
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default brandAnalytics;
