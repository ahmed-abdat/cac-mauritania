interface EmailData {
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export const createEmailTemplate = (data: EmailData) => {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle demande de contact - MBI</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f8fafc;
      color: #334155;
      line-height: 1.5;
      padding: 20px;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
    }
    
    /* Header - Simplified */
    .header {
      background: #ffffff;
      padding: 24px;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      max-width: 100%;
    }
    
    .logo-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    /* Logo - Fixed Container */
    .logo-container {
      width: 64px;
      height: 64px;
      background: transparent;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #e2e8f0;
      flex-shrink: 0;
    }
    
    .logo-container img {
      max-width: 52px;
      max-height: 52px;
      object-fit: contain;
    }
    
    .company-name {
      font-size: 20px;
      font-weight: 600;
      color: #1e293b;
      line-height: 1.3;
    }
    
    /* Content */
    .content {
      padding: 24px;
    }
    
    /* Alert Banner - Simplified */
    .alert-banner {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 24px;
    }
    
    .alert-title {
      font-weight: 600;
      font-size: 15px;
      color: #0c4a6e;
      margin-bottom: 4px;
    }
    
    .alert-description {
      font-size: 14px;
      color: #0369a1;
    }
    
    /* Section Title - Clean */
    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }
    
    /* Contact Grid - Better Spacing */
    .contact-grid {
      display: grid;
      gap: 12px;
      margin-bottom: 24px;
    }
    
    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }
    
    /* Minimal Icons - Only When Necessary */
    .contact-icon {
      width: 16px;
      height: 16px;
      color: #64748b;
      margin-top: 2px;
      flex-shrink: 0;
    }
    
    .contact-info {
      flex: 1;
    }
    
    .contact-label {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 3px;
    }
    
    .contact-value {
      font-size: 14px;
      font-weight: 500;
      color: #1e293b;
    }
    
    .contact-value.link {
      color: #2563eb;
      text-decoration: none;
    }
    
    .contact-value.link:hover {
      text-decoration: underline;
    }
    
    /* Message Section - Clean */
    .message-section {
      margin: 24px 0;
    }
    
    .message-title {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .message-content {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 16px;
      font-size: 14px;
      line-height: 1.6;
      color: #374151;
      white-space: pre-wrap;
    }
    
    /* Action Buttons - Fixed Spacing and Contrast */
    .action-buttons {
      display: flex;
      gap: 16px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
      margin-top: 24px;
      flex-wrap: wrap;
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 20px;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      border-radius: 8px;
      border: 1px solid transparent;
      transition: background-color 0.2s, border-color 0.2s;
      min-width: 140px;
      text-align: center;
    }
    
    /* Primary Button - High Contrast */
    .btn-primary {
      background: #1A4FE6;
      color: #ffffff;
      border-color: #1A4FE6;
    }
    
    .btn-primary:hover {
      background: #1E40AF;
      border-color: #1E40AF;
    }
    
    /* Secondary Button - Subtle Hover */
    .btn-secondary {
      background: #ffffff;
      color: #374151;
      border-color: #d1d5db;
    }
    
    .btn-secondary:hover {
      background: #f9fafb;
      border-color: #9ca3af;
      color: #1f2937;
    }
    
    /* Footer - Simplified */
    .footer {
      background: #f8fafc;
      padding: 20px 24px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
    }
    
    .footer-company {
      font-weight: 600;
      font-size: 14px;
      color: #1e293b;
      margin-bottom: 8px;
    }
    
    .footer-contact {
      font-size: 12px;
      color: #64748b;
      margin-bottom: 12px;
    }
    
    .footer-bottom {
      font-size: 11px;
      color: #9ca3af;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
      line-height: 1.4;
    }
    
    /* Responsive */
    @media (max-width: 600px) {
      body {
        padding: 10px;
      }
      
      .header {
        padding: 20px;
      }
      
      .content {
        padding: 20px;
      }
      
      .footer {
        padding: 16px 20px;
      }
      
      .header-content {
        flex-direction: row;
        gap: 16px;
        text-align: left;
      }
      
      .logo-section {
        flex-direction: row;
        align-items: center;
      }
      
      .action-buttons {
        flex-direction: row;
        gap: 12px;
      }
      
      .btn {
        width: auto;
        flex: 1;
      }
      
      .logo-container {
        width: 56px;
        height: 56px;
      }
      
      .logo-container img {
        max-width: 48px;
        max-height: 48px;
      }
      
      .company-name {
        font-size: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td valign="middle" style="padding:0;">
            <img src="cid:logo" alt="MBI Logo" width="56" height="56" style="display:block;border-radius:8px;border:1px solid #e2e8f0;">
          </td>
          <td valign="middle" style="padding-left:16px;font-size:20px;font-weight:600;color:#1e293b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
            MBI - Modern Building Industry
          </td>
        </tr>
      </table>
    </div>
    
    <!-- Content -->
    <div class="content">
      <!-- Alert Banner -->
      <div class="alert-banner">
        <div class="alert-title">Nouvelle demande de contact</div>
        <div class="alert-description">
          Vous avez reçu un nouveau message depuis votre site web.
        </div>
      </div>
      
      <!-- Contact Information -->
      <div class="section-title">Informations du Contact</div>
      
      <div class="contact-grid">
        <div class="contact-item">
          <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <div class="contact-info">
            <div class="contact-label">Nom complet</div>
            <div class="contact-value">${data.firstName} ${data.lastName}</div>
          </div>
        </div>
        
        <div class="contact-item">
          <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <div class="contact-info">
            <div class="contact-label">Email</div>
            <a href="mailto:${data.email}" class="contact-value link">${
    data.email
  }</a>
          </div>
        </div>
        
        <div class="contact-item">
          <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          <div class="contact-info">
            <div class="contact-label">Téléphone</div>
            <a href="tel:${data.phoneNumber}" class="contact-value link">${
    data.phoneNumber
  }</a>
          </div>
        </div>
        
        ${
          data.companyName
            ? `
        <div class="contact-item">
          <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <div class="contact-info">
            <div class="contact-label">Entreprise</div>
            <div class="contact-value">${data.companyName}</div>
          </div>
        </div>
        `
            : ""
        }
        
        <div class="contact-item">
          <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <div class="contact-info">
            <div class="contact-label">Date de soumission</div>
            <div class="contact-value">${currentDate}</div>
          </div>
        </div>
      </div>
      
      <!-- Message Section -->
      <div class="message-section">
        <div class="message-title">Message</div>
        <div class="message-content">${data.message}</div>
      </div>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <a href="mailto:${
          data.email
        }?subject=Re: Votre demande de contact" class="btn btn-primary" style="background:#1A4FE6;color:#ffffff;text-decoration:none;display:inline-block;padding:12px 20px;font-size:14px;font-weight:600;border-radius:8px;border:1px solid #1A4FE6;margin-right:16px;">
          Répondre à ${data.firstName}
        </a>
        <a href="tel:${
          data.phoneNumber
        }" class="btn btn-secondary" style="background:#ffffff;color:#1A4FE6;text-decoration:none;display:inline-block;padding:12px 20px;font-size:14px;font-weight:600;border-radius:8px;border:1px solid #1A4FE6;">
          Appeler ${data.firstName}
        </a>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="footer-company">MBI - Modern Building Industry</div>
      
      <div class="footer-contact">
        info@groupembirim.com • +222 42 02 22 55
      </div>
      
      <div class="footer-bottom">
        © ${currentYear} MBI Modern Building Industry. Tous droits réservés.
      </div>
    </div>
  </div>
</body>
</html>`;
};
