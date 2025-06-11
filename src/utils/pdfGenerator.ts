
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
        
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #1f2937;
          line-height: 1.6;
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 100vh;
        }
        
        .receipt-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          position: relative;
        }
        
        .receipt-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
        }
        
        .header { 
          text-align: center; 
          padding: 30px 20px 25px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
        }
        
        .company { 
          font-weight: 700; 
          font-size: 22px; 
          color: #1e293b;
          margin-bottom: 8px;
          letter-spacing: -0.025em;
        }
        
        .company-details {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        
        .document-type { 
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          font-weight: 600; 
          font-size: 14px; 
          padding: 12px 20px;
          border-radius: 8px;
          margin: 15px 20px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
        }
        
        .document-number {
          font-size: 16px;
          font-weight: 700;
          margin-top: 8px;
          color: white;
        }
        
        .content {
          padding: 20px;
        }
        
        .info-section {
          background: #f8fafc;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
          border-left: 4px solid #3b82f6;
        }
        
        .info-row { 
          display: flex; 
          justify-content: space-between; 
          margin: 8px 0; 
          font-size: 14px;
        }
        
        .info-label {
          font-weight: 500;
          color: #374151;
        }
        
        .info-value {
          font-weight: 600;
          color: #1f2937;
        }
        
        .items-section {
          margin: 25px 0;
        }
        
        .section-title {
          font-weight: 600;
          font-size: 16px;
          color: #1e293b;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .item:last-child {
          border-bottom: none;
        }
        
        .item-details {
          flex: 1;
        }
        
        .item-name {
          font-weight: 500;
          color: #1f2937;
          font-size: 14px;
        }
        
        .item-quantity {
          font-size: 12px;
          color: #64748b;
          margin-top: 2px;
        }
        
        .item-price {
          font-weight: 600;
          color: #059669;
          font-size: 14px;
        }
        
        .totals-section { 
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 12px;
          padding: 20px;
          margin: 25px 0;
          border: 1px solid #e2e8f0;
        }
        
        .total-row { 
          display: flex; 
          justify-content: space-between; 
          margin: 8px 0; 
          font-size: 14px;
        }
        
        .total-label {
          color: #374151;
        }
        
        .total-value {
          font-weight: 600;
          color: #1f2937;
        }
        
        .total-final { 
          border-top: 2px solid #3b82f6;
          padding-top: 12px;
          margin-top: 12px;
        }
        
        .total-final .total-label {
          font-weight: 700;
          font-size: 16px;
          color: #1e293b;
        }
        
        .total-final .total-value {
          font-weight: 700;
          font-size: 18px;
          color: #059669;
        }
        
        .payment-info {
          background: #fef3c7;
          border: 1px solid #fbbf24;
          border-radius: 8px;
          padding: 12px;
          margin: 15px 0;
          font-size: 14px;
        }
        
        .footer { 
          text-align: center; 
          padding: 25px 20px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          font-size: 11px;
          color: #64748b;
          line-height: 1.6;
        }
        
        .footer-title {
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }
        
        .qr-placeholder {
          width: 80px;
          height: 80px;
          background: #e2e8f0;
          border-radius: 8px;
          margin: 15px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: #64748b;
        }
        
        @media print {
          body { 
            margin: 0; 
            padding: 0;
            background: white;
          }
          .receipt-container {
            box-shadow: none;
            border-radius: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt-container">
        <div class="header">
          <div class="company">MI EMPRESA SAC</div>
          <div class="company-details">
            RUC: 20123456789<br>
            Av. Principal 123, Lima, Perú<br>
            Teléfono: (01) 123-4567
          </div>
          <div class="document-type">
            Boleta de Venta Electrónica
            <div class="document-number">${ventaData.serie}-${ventaData.numero}</div>
          </div>
        </div>

        <div class="content">
          <div class="info-section">
            <div class="info-row">
              <span class="info-label">Fecha:</span>
              <span class="info-value">${fecha}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Hora:</span>
              <span class="info-value">${hora}</span>
            </div>
            ${ventaData.customer ? `
              <div class="info-row">
                <span class="info-label">Cliente:</span>
                <span class="info-value">${ventaData.customer.nombre}</span>
              </div>
              <div class="info-row">
                <span class="info-label">DNI:</span>
                <span class="info-value">${ventaData.customer.documento}</span>
              </div>
            ` : ''}
          </div>

          <div class="items-section">
            <div class="section-title">Productos y Servicios</div>
            ${ventaData.items.map((item: any) => `
              <div class="item">
                <div class="item-details">
                  <div class="item-name">${item.nombre}</div>
                  <div class="item-quantity">${item.cantidad} × S/ ${item.precio.toFixed(2)}</div>
                </div>
                <div class="item-price">S/ ${item.subtotal.toFixed(2)}</div>
              </div>
            `).join('')}
          </div>

          <div class="totals-section">
            <div class="total-row">
              <span class="total-label">Subtotal:</span>
              <span class="total-value">S/ ${(ventaData.total / 1.18).toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span class="total-label">IGV (18%):</span>
              <span class="total-value">S/ ${ventaData.igv.toFixed(2)}</span>
            </div>
            <div class="total-row total-final">
              <span class="total-label">TOTAL:</span>
              <span class="total-value">S/ ${ventaData.total.toFixed(2)}</span>
            </div>
          </div>

          <div class="payment-info">
            <strong>Método de Pago:</strong> ${ventaData.metodoPago.toUpperCase()}
          </div>

          ${ventaData.observaciones ? `
            <div class="info-section">
              <div class="info-row">
                <span class="info-label">Observaciones:</span>
              </div>
              <div style="margin-top: 8px; font-size: 13px; color: #374151;">
                ${ventaData.observaciones}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="footer">
          <div class="footer-title">Representación impresa de la Boleta de Venta Electrónica</div>
          <div class="qr-placeholder">QR CODE</div>
          <div>Consulte en www.sunat.gob.pe</div>
          <div style="margin-top: 10px; font-weight: 600; color: #059669;">¡Gracias por su compra!</div>
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
        
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #1f2937;
          line-height: 1.6;
          background: #f8fafc;
          padding: 30px;
        }
        
        .invoice-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          position: relative;
        }
        
        .invoice-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #3b82f6, #1d4ed8, #7c3aed);
        }
        
        .header { 
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 40px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-bottom: 1px solid #e2e8f0;
        }
        
        .company-info {
          display: flex;
          flex-direction: column;
        }
        
        .company { 
          font-weight: 700; 
          font-size: 28px; 
          color: #1e293b;
          margin-bottom: 15px;
          letter-spacing: -0.025em;
        }
        
        .company-details {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
        }
        
        .company-details div {
          margin-bottom: 4px;
        }
        
        .document-info {
          text-align: right;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .document-type { 
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          font-weight: 700; 
          font-size: 16px; 
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          margin-bottom: 20px;
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4);
        }
        
        .document-number {
          font-size: 20px;
          margin-top: 8px;
          letter-spacing: 1px;
        }
        
        .date-info {
          background: #f1f5f9;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
        }
        
        .info-row {
          margin: 8px 0;
          font-size: 14px;
        }
        
        .info-label {
          font-weight: 600;
          color: #374151;
        }
        
        .info-value {
          color: #1f2937;
        }
        
        .client-section {
          padding: 40px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .section-title {
          font-weight: 700;
          font-size: 18px;
          color: #1e293b;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 3px solid #3b82f6;
          display: inline-block;
        }
        
        .client-info {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 25px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .client-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .client-field {
          margin-bottom: 12px;
        }
        
        .client-label {
          font-weight: 600;
          color: #374151;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        
        .client-value {
          color: #1f2937;
          font-size: 15px;
          font-weight: 500;
        }
        
        .items-section {
          padding: 40px;
        }
        
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .items-table thead {
          background: linear-gradient(135deg, #1e293b, #334155);
        }
        
        .items-table th {
          color: white;
          font-weight: 600;
          padding: 16px;
          text-align: left;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .items-table tbody tr {
          border-bottom: 1px solid #f1f5f9;
          transition: background-color 0.2s;
        }
        
        .items-table tbody tr:hover {
          background-color: #f8fafc;
        }
        
        .items-table tbody tr:last-child {
          border-bottom: none;
        }
        
        .items-table td {
          padding: 16px;
          font-size: 14px;
          color: #374151;
        }
        
        .item-name {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }
        
        .item-code {
          font-size: 12px;
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
          padding: 40px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-top: 1px solid #e2e8f0;
        }
        
        .totals-container {
          max-width: 400px;
          margin-left: auto;
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }
        
        .total-row {
          display: flex;
          justify-content: space-between;
          margin: 12px 0;
          font-size: 15px;
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
          font-weight: 700;
          font-size: 18px;
          color: #1e293b;
        }
        
        .total-final .total-value {
          font-weight: 700;
          font-size: 20px;
          color: #059669;
        }
        
        .additional-info {
          padding: 40px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
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
          margin-bottom: 8px;
        }
        
        .info-card-content {
          color: #374151;
        }
        
        .footer {
          text-align: center;
          padding: 40px;
          background: linear-gradient(135deg, #1e293b, #334155);
          color: white;
        }
        
        .footer-title {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 15px;
        }
        
        .footer-links {
          font-size: 14px;
          margin-bottom: 15px;
          opacity: 0.9;
        }
        
        .footer-thanks {
          font-size: 18px;
          font-weight: 600;
          color: #10b981;
          margin-top: 20px;
        }
        
        .qr-placeholder {
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          margin: 20px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          border: 2px dashed rgba(255, 255, 255, 0.3);
        }
        
        @media print {
          body { 
            margin: 0; 
            padding: 0;
            background: white;
          }
          .invoice-container {
            box-shadow: none;
            border-radius: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div class="company-info">
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
              <div class="info-row">
                <span class="info-label">Fecha:</span> ${fecha}
              </div>
              <div class="info-row">
                <span class="info-label">Hora:</span> ${hora}
              </div>
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
                <th>Ítem</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${ventaData.items.map((item: any, index: number) => `
                <tr>
                  <td class="number">${index + 1}</td>
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
              <span class="total-label">Subtotal:</span>
              <span class="total-value">S/ ${(ventaData.total / 1.18).toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span class="total-label">IGV (18%):</span>
              <span class="total-value">S/ ${ventaData.igv.toFixed(2)}</span>
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
          <div class="qr-placeholder">CÓDIGO QR</div>
          <div class="footer-links">
            Consulte su documento en www.sunat.gob.pe<br>
            Esta factura ha sido generada electrónicamente
          </div>
          <div class="footer-thanks">¡Gracias por su confianza!</div>
        </div>
      </div>
    </body>
    </html>
  `;
};
