// Utilidad para generar PDFs de comprobantes de venta
// En una implementación real, usarías una librería como jsPDF o PDFKit

export const generateReceiptPDF = async (ventaData: any) => {
  console.log('Generando Boleta PDF:', ventaData);
  
  // Simular generación de PDF
  const pdfContent = generateReceiptHTML(ventaData);
  
  // En una implementación real, aquí generarías el PDF
  // Por ahora, abrimos una ventana con el contenido HTML
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Dar tiempo para cargar el contenido antes de imprimir
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
};

export const generateInvoicePDF = async (ventaData: any) => {
  console.log('Generando Factura PDF:', ventaData);
  
  // Simular generación de PDF
  const pdfContent = generateInvoiceHTML(ventaData);
  
  // En una implementación real, aquí generarías el PDF
  // Por ahora, abrimos una ventana con el contenido HTML
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Dar tiempo para cargar el contenido antes de imprimir
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
};

const generateReceiptHTML = (ventaData: any) => {
  const fecha = new Date(ventaData.fecha).toLocaleDateString('es-PE');
  const hora = new Date(ventaData.fecha).toLocaleTimeString('es-PE');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Boleta de Venta ${ventaData.serie}-${ventaData.numero}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @page {
          size: A4;
          margin: 0;
        }
        
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #1f2937;
          line-height: 1.5;
          background: white;
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          padding: 20mm;
          font-size: 11pt;
        }
        
        .document-container {
          width: 100%;
          height: 100%;
          position: relative;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .header { 
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          padding: 25px 30px;
          text-align: center;
          position: relative;
        }
        
        .header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #10b981, #f59e0b);
        }
        
        .company-logo {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 50%;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 24px;
          color: #1e293b;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .company { 
          font-weight: 700; 
          font-size: 24px; 
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        
        .company-details {
          font-size: 13px;
          opacity: 0.9;
          line-height: 1.6;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .document-header {
          background: #f8fafc;
          padding: 25px 30px;
          border-bottom: 1px solid #e2e8f0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          align-items: center;
        }
        
        .document-type { 
          background: linear-gradient(135deg, #dc2626, #991b1b);
          color: white;
          font-weight: 700; 
          font-size: 16px; 
          padding: 15px 25px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(220, 38, 38, 0.3);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .document-number {
          font-size: 18px;
          margin-top: 8px;
          font-weight: 900;
        }
        
        .document-info {
          text-align: right;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 10px;
        }
        
        .info-field {
          background: white;
          padding: 12px 15px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }
        
        .info-label {
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        
        .info-value {
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
        }
        
        .client-section {
          padding: 25px 30px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .section-title {
          font-weight: 700;
          font-size: 16px;
          color: #1e293b;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding-bottom: 8px;
          border-bottom: 2px solid #3b82f6;
          display: inline-block;
        }
        
        .client-info {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .client-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .items-section {
          padding: 25px 30px;
        }
        
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .items-table thead {
          background: linear-gradient(135deg, #374151, #1f2937);
        }
        
        .items-table th {
          color: white;
          font-weight: 600;
          padding: 15px 12px;
          text-align: left;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .items-table tbody tr {
          border-bottom: 1px solid #f3f4f6;
        }
        
        .items-table tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }
        
        .items-table tbody tr:hover {
          background-color: #f3f4f6;
        }
        
        .items-table td {
          padding: 12px;
          font-size: 12px;
          color: #374151;
          border-right: 1px solid #f3f4f6;
        }
        
        .items-table td:last-child {
          border-right: none;
        }
        
        .item-name {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 3px;
        }
        
        .item-code {
          font-size: 10px;
          color: #6b7280;
          font-family: 'Courier New', monospace;
        }
        
        .number {
          text-align: right;
          font-weight: 500;
        }
        
        .price-cell {
          color: #059669;
          font-weight: 600;
        }
        
        .totals-section {
          padding: 25px 30px;
          background: #f8fafc;
        }
        
        .totals-container {
          max-width: 400px;
          margin-left: auto;
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }
        
        .total-row {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          font-size: 14px;
          padding: 8px 0;
        }
        
        .total-label {
          color: #374151;
          font-weight: 500;
        }
        
        .total-value {
          font-weight: 600;
          color: #1f2937;
        }
        
        .total-final {
          border-top: 2px solid #3b82f6;
          padding-top: 15px;
          margin-top: 15px;
        }
        
        .total-final .total-label {
          font-weight: 800;
          font-size: 16px;
          color: #1e293b;
          text-transform: uppercase;
        }
        
        .total-final .total-value {
          font-weight: 800;
          font-size: 18px;
          color: #059669;
        }
        
        .additional-info {
          padding: 25px 30px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }
        
        .info-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .info-card {
          background: white;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .info-card-title {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 8px;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .info-card-content {
          color: #374151;
          font-size: 14px;
          font-weight: 500;
        }
        
        .footer {
          background: linear-gradient(135deg, #1e293b, #374151);
          color: white;
          padding: 30px;
          text-align: center;
          margin-top: auto;
        }
        
        .footer-content {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .footer-title {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .qr-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin: 20px 0;
        }
        
        .qr-placeholder {
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          border: 2px dashed rgba(255, 255, 255, 0.3);
          text-align: center;
          line-height: 1.2;
        }
        
        .qr-info {
          flex: 1;
          text-align: left;
        }
        
        .footer-links {
          font-size: 12px;
          opacity: 0.8;
          margin: 15px 0;
          line-height: 1.6;
        }
        
        .footer-thanks {
          font-size: 16px;
          font-weight: 700;
          color: #10b981;
          margin-top: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 120px;
          color: rgba(0, 0, 0, 0.03);
          font-weight: 900;
          z-index: 0;
          pointer-events: none;
        }
        
        .content-wrapper {
          position: relative;
          z-index: 1;
        }
        
        @media print {
          body { 
            margin: 0; 
            padding: 15mm;
          }
          .document-container {
            border: none;
            border-radius: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="document-container">
        <div class="watermark">ORIGINAL</div>
        
        <div class="content-wrapper">
          <div class="header">
            <div class="company-logo">ME</div>
            <div class="company">MI EMPRESA SAC</div>
            <div class="company-details">
              RUC: 20123456789 | Av. Principal 123, Lima, Perú<br>
              Teléfono: (01) 123-4567 | Email: ventas@miempresa.com
            </div>
          </div>

          <div class="document-header">
            <div class="document-type">
              Boleta de Venta Electrónica
              <div class="document-number">${ventaData.serie}-${ventaData.numero}</div>
            </div>
            <div class="document-info">
              <div class="info-grid">
                <div class="info-field">
                  <div class="info-label">Fecha</div>
                  <div class="info-value">${fecha}</div>
                </div>
                <div class="info-field">
                  <div class="info-label">Hora</div>
                  <div class="info-value">${hora}</div>
                </div>
              </div>
            </div>
          </div>

          ${ventaData.customer ? `
            <div class="client-section">
              <div class="section-title">Datos del Cliente</div>
              <div class="client-info">
                <div class="client-grid">
                  <div>
                    <div class="client-field">
                      <div class="client-label">Cliente</div>
                      <div class="client-value">${ventaData.customer.nombre}</div>
                    </div>
                    <div class="client-field">
                      <div class="client-label">Documento</div>
                      <div class="client-value">${ventaData.customer.documento}</div>
                    </div>
                  </div>
                  <div>
                    <div class="client-field">
                      <div class="client-label">Dirección</div>
                      <div class="client-value">${ventaData.customer.direccion || 'No especificada'}</div>
                    </div>
                    ${ventaData.customer.email ? `
                      <div class="client-field">
                        <div class="client-label">Email</div>
                        <div class="client-value">${ventaData.customer.email}</div>
                      </div>
                    ` : ''}
                  </div>
                </div>
              </div>
            </div>
          ` : ''}

          <div class="items-section">
            <div class="section-title">Detalle de Productos y Servicios</div>
            <table class="items-table">
              <thead>
                <tr>
                  <th style="width: 8%">Item</th>
                  <th style="width: 12%">Código</th>
                  <th style="width: 40%">Descripción</th>
                  <th style="width: 10%">Cant.</th>
                  <th style="width: 15%">P. Unit.</th>
                  <th style="width: 15%">Total</th>
                </tr>
              </thead>
              <tbody>
                ${ventaData.items.map((item: any, index: number) => `
                  <tr>
                    <td class="number">${String(index + 1).padStart(3, '0')}</td>
                    <td class="item-code">${item.codigo}</td>
                    <td>
                      <div class="item-name">${item.nombre}</div>
                    </td>
                    <td class="number">${item.cantidad}</td>
                    <td class="number price-cell">S/ ${item.precio.toFixed(2)}</td>
                    <td class="number price-cell">S/ ${item.subtotal.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="totals-section">
            <div class="totals-container">
              <div class="total-row">
                <span class="total-label">Operaciones Gravadas:</span>
                <span class="total-value">S/ ${(ventaData.total / 1.18).toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span class="total-label">IGV (18%):</span>
                <span class="total-value">S/ ${ventaData.igv.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span class="total-label">Operaciones Inafectas:</span>
                <span class="total-value">S/ 0.00</span>
              </div>
              <div class="total-row">
                <span class="total-label">Operaciones Exoneradas:</span>
                <span class="total-value">S/ 0.00</span>
              </div>
              <div class="total-row total-final">
                <span class="total-label">IMPORTE TOTAL:</span>
                <span class="total-value">S/ ${ventaData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div class="additional-info">
            <div class="info-cards">
              <div class="info-card">
                <div class="info-card-title">Método de Pago</div>
                <div class="info-card-content">${ventaData.metodoPago.toUpperCase()}</div>
              </div>
              ${ventaData.observaciones ? `
                <div class="info-card">
                  <div class="info-card-title">Observaciones</div>
                  <div class="info-card-content">${ventaData.observaciones}</div>
                </div>
              ` : `
                <div class="info-card">
                  <div class="info-card-title">Estado del Documento</div>
                  <div class="info-card-content">Documento válido y procesado correctamente</div>
                </div>
              `}
            </div>
          </div>

          <div class="footer">
            <div class="footer-content">
              <div class="footer-title">Representación Impresa de la Boleta de Venta Electrónica</div>
              <div class="qr-section">
                <div class="qr-placeholder">
                  CÓDIGO<br>QR<br>SUNAT
                </div>
                <div class="qr-info">
                  <div class="footer-links">
                    • Consulte la validez del documento en www.sunat.gob.pe<br>
                    • Este documento ha sido generado electrónicamente<br>
                    • Autorizado mediante Resolución SUNAT
                  </div>
                </div>
              </div>
              <div class="footer-thanks">¡Gracias por su preferencia!</div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const generateInvoiceHTML = (ventaData: any) => {
  const fecha = new Date(ventaData.fecha).toLocaleDateString('es-PE');
  const hora = new Date(ventaData.fecha).toLocaleTimeString('es-PE');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Factura ${ventaData.serie}-${ventaData.numero}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @page {
          size: A4;
          margin: 0;
        }
        
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #1f2937;
          line-height: 1.5;
          background: white;
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          padding: 15mm;
          font-size: 11pt;
        }
        
        .document-container {
          width: 100%;
          height: 100%;
          position: relative;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .header { 
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          padding: 30px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        
        .company-info {
          display: flex;
          flex-direction: column;
        }
        
        .company-logo {
          width: 70px;
          height: 70px;
          background: white;
          border-radius: 12px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 20px;
          color: #1e293b;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        
        .company { 
          font-weight: 700; 
          font-size: 26px; 
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        
        .company-details {
          font-size: 13px;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        .document-info {
          text-align: right;
        }
        
        .document-type { 
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          font-weight: 700; 
          font-size: 18px; 
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          margin-bottom: 20px;
          box-shadow: 0 6px 10px rgba(5, 150, 105, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .document-number {
          font-size: 22px;
          margin-top: 10px;
          font-weight: 900;
        }
        
        .date-info {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .client-section {
          padding: 30px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .section-title {
          font-weight: 700;
          font-size: 18px;
          color: #1e293b;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding-bottom: 10px;
          border-bottom: 3px solid #3b82f6;
          display: inline-block;
        }
        
        .client-info {
          background: white;
          padding: 25px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .client-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }
        
        .client-field {
          margin-bottom: 15px;
        }
        
        .client-label {
          font-weight: 600;
          color: #374151;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        
        .client-value {
          color: #1f2937;
          font-size: 15px;
          font-weight: 500;
        }
        
        .items-section {
          padding: 30px;
        }
        
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .items-table thead {
          background: linear-gradient(135deg, #1e293b, #334155);
        }
        
        .items-table th {
          color: white;
          font-weight: 600;
          padding: 16px;
          text-align: left;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .items-table tbody tr {
          border-bottom: 1px solid #f1f5f9;
        }
        
        .items-table tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }
        
        .items-table tbody tr:hover {
          background-color: #f3f4f6;
        }
        
        .items-table td {
          padding: 14px 16px;
          font-size: 13px;
          color: #374151;
        }
        
        .item-name {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }
        
        .item-code {
          font-size: 11px;
          color: #64748b;
          font-family: 'Courier New', monospace;
        }
        
        .number {
          text-align: right;
          font-weight: 500;
        }
        
        .price-cell {
          color: #059669;
          font-weight: 600;
        }
        
        .totals-section {
          padding: 30px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }
        
        .totals-container {
          max-width: 450px;
          margin-left: auto;
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }
        
        .total-row {
          display: flex;
          justify-content: space-between;
          margin: 12px 0;
          font-size: 15px;
          padding: 10px 0;
        }
        
        .total-label {
          color: #374151;
          font-weight: 500;
        }
        
        .total-value {
          font-weight: 600;
          color: #1f2937;
        }
        
        .total-final {
          border-top: 3px solid #3b82f6;
          padding-top: 20px;
          margin-top: 20px;
        }
        
        .total-final .total-label {
          font-weight: 800;
          font-size: 18px;
          color: #1e293b;
          text-transform: uppercase;
        }
        
        .total-final .total-value {
          font-weight: 800;
          font-size: 20px;
          color: #059669;
        }
        
        .additional-info {
          padding: 30px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }
        
        .info-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .info-card-title {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 10px;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .info-card-content {
          color: #374151;
          font-size: 14px;
        }
        
        .footer {
          background: linear-gradient(135deg, #1e293b, #374151);
          color: white;
          padding: 40px;
          text-align: center;
        }
        
        .footer-title {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .footer-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          margin: 25px 0;
        }
        
        .qr-placeholder {
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          border: 2px dashed rgba(255, 255, 255, 0.3);
          text-align: center;
          line-height: 1.2;
        }
        
        .footer-info {
          flex: 1;
          text-align: left;
        }
        
        .footer-links {
          font-size: 13px;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        .footer-thanks {
          font-size: 18px;
          font-weight: 700;
          color: #10b981;
          margin-top: 25px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        @media print {
          body { 
            margin: 0; 
            padding: 10mm;
          }
          .document-container {
            border: none;
            border-radius: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="document-container">
        <div class="header">
          <div class="company-info">
            <div class="company-logo">ME</div>
            <div class="company">MI EMPRESA SAC</div>
            <div class="company-details">
              <div><strong>RUC:</strong> 20123456789</div>
              <div><strong>Dirección:</strong> Av. Principal 123</div>
              <div>Lima, Perú</div>
              <div><strong>Teléfono:</strong> (01) 123-4567</div>
              <div><strong>Email:</strong> ventas@miempresa.com</div>
            </div>
          </div>
          <div class="document-info">
            <div class="document-type">
              FACTURA ELECTRÓNICA
              <div class="document-number">${ventaData.serie}-${ventaData.numero}</div>
            </div>
            <div class="date-info">
              <div style="margin-bottom: 8px;"><strong>Fecha:</strong> ${fecha}</div>
              <div><strong>Hora:</strong> ${hora}</div>
            </div>
          </div>
        </div>

        <div class="client-section">
          <div class="section-title">DATOS DEL CLIENTE</div>
          <div class="client-info">
            <div class="client-grid">
              <div>
                <div class="client-field">
                  <div class="client-label">Razón Social</div>
                  <div class="client-value">${ventaData.customer?.nombre || 'Cliente General'}</div>
                </div>
                <div class="client-field">
                  <div class="client-label">RUC</div>
                  <div class="client-value">${ventaData.customer?.documento || '-'}</div>
                </div>
              </div>
              <div>
                <div class="client-field">
                  <div class="client-label">Dirección</div>
                  <div class="client-value">${ventaData.customer?.direccion || 'No especificada'}</div>
                </div>
                ${ventaData.customer?.email ? `
                  <div class="client-field">
                    <div class="client-label">Email</div>
                    <div class="client-value">${ventaData.customer.email}</div>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        </div>

        <div class="items-section">
          <div class="section-title">PRODUCTOS Y SERVICIOS</div>
          <table class="items-table">
            <thead>
              <tr>
                <th style="width: 8%">Ítem</th>
                <th style="width: 37%">Descripción</th>
                <th style="width: 15%">Cantidad</th>
                <th style="width: 20%">Precio Unitario</th>
                <th style="width: 20%">Total</th>
              </tr>
            </thead>
            <tbody>
              ${ventaData.items.map((item: any, index: number) => `
                <tr>
                  <td class="number">${String(index + 1).padStart(3, '0')}</td>
                  <td>
                    <div class="item-name">${item.nombre}</div>
                    <div class="item-code">${item.codigo}</div>
                  </td>
                  <td class="number">${item.cantidad}</td>
                  <td class="number price-cell">S/ ${item.precio.toFixed(2)}</td>
                  <td class="number price-cell">S/ ${item.subtotal.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="totals-section">
          <div class="totals-container">
            <div class="total-row">
              <span class="total-label">Operaciones Gravadas:</span>
              <span class="total-value">S/ ${(ventaData.total / 1.18).toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span class="total-label">IGV (18%):</span>
              <span class="total-value">S/ ${ventaData.igv.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span class="total-label">Operaciones Inafectas:</span>
              <span class="total-value">S/ 0.00</span>
            </div>
            <div class="total-row">
              <span class="total-label">Operaciones Exoneradas:</span>
              <span class="total-value">S/ 0.00</span>
            </div>
            <div class="total-row total-final">
              <span class="total-label">TOTAL A PAGAR:</span>
              <span class="total-value">S/ ${ventaData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div class="additional-info">
          <div class="info-grid">
            <div class="info-card">
              <div class="info-card-title">Método de Pago</div>
              <div class="info-card-content">${ventaData.metodoPago.toUpperCase()}</div>
            </div>
            ${ventaData.observaciones ? `
              <div class="info-card">
                <div class="info-card-title">Observaciones</div>
                <div class="info-card-content">${ventaData.observaciones}</div>
              </div>
            ` : `
              <div class="info-card">
                <div class="info-card-title">Estado</div>
                <div class="info-card-content">Documento válido y procesado</div>
              </div>
            `}
          </div>
        </div>

        <div class="footer">
          <div class="footer-title">Representación impresa de la Factura Electrónica</div>
          <div class="footer-content">
            <div class="qr-placeholder">CÓDIGO<br>QR<br>SUNAT</div>
            <div class="footer-info">
              <div class="footer-links">
                • Consulte su documento en www.sunat.gob.pe<br>
                • Esta factura ha sido generada electrónicamente<br>
                • Autorizado mediante Resolución de Superintendencia<br>
                • Para consultas: ventas@miempresa.com
              </div>
            </div>
          </div>
          <div class="footer-thanks">¡Gracias por su confianza!</div>
        </div>
      </div>
    </body>
    </html>
  `;
};
