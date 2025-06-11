
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
        body { 
          font-family: 'Courier New', monospace; 
          margin: 20px; 
          font-size: 12px;
          line-height: 1.4;
        }
        .header { 
          text-align: center; 
          border-bottom: 2px solid #000; 
          padding-bottom: 10px; 
          margin-bottom: 15px; 
        }
        .company { 
          font-weight: bold; 
          font-size: 16px; 
          margin-bottom: 5px; 
        }
        .document-type { 
          font-weight: bold; 
          font-size: 14px; 
          margin: 10px 0; 
        }
        .info-row { 
          display: flex; 
          justify-content: space-between; 
          margin: 5px 0; 
        }
        .items-table { 
          width: 100%; 
          border-collapse: collapse; 
          margin: 15px 0; 
        }
        .items-table th, .items-table td { 
          padding: 5px; 
          text-align: left; 
          border-bottom: 1px solid #000; 
        }
        .items-table th { 
          font-weight: bold; 
        }
        .total-section { 
          border-top: 2px solid #000; 
          padding-top: 10px; 
          margin-top: 15px; 
        }
        .total-row { 
          display: flex; 
          justify-content: space-between; 
          margin: 3px 0; 
        }
        .total-final { 
          font-weight: bold; 
          font-size: 14px; 
          border-top: 1px solid #000; 
          padding-top: 5px; 
          margin-top: 5px; 
        }
        .footer { 
          text-align: center; 
          margin-top: 20px; 
          font-size: 10px; 
        }
        @media print {
          body { margin: 0; }
          .header { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company">MI EMPRESA SAC</div>
        <div>RUC: 20123456789</div>
        <div>Dirección: Av. Principal 123, Lima, Perú</div>
        <div>Teléfono: (01) 123-4567</div>
        <div class="document-type">BOLETA DE VENTA ELECTRÓNICA</div>
        <div>${ventaData.serie}-${ventaData.numero}</div>
      </div>

      <div class="info-row">
        <span>Fecha: ${fecha}</span>
        <span>Hora: ${hora}</span>
      </div>
      
      ${ventaData.customer ? `
        <div class="info-row">
          <span>Cliente: ${ventaData.customer.nombre}</span>
        </div>
        <div class="info-row">
          <span>DNI: ${ventaData.customer.documento}</span>
        </div>
      ` : ''}

      <table class="items-table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cant.</th>
            <th>P. Unit.</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${ventaData.items.map((item: any) => `
            <tr>
              <td>${item.nombre}</td>
              <td>${item.cantidad}</td>
              <td>S/ ${item.precio.toFixed(2)}</td>
              <td>S/ ${item.subtotal.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="total-section">
        <div class="total-row">
          <span>Subtotal:</span>
          <span>S/ ${(ventaData.total / 1.18).toFixed(2)}</span>
        </div>
        <div class="total-row">
          <span>IGV (18%):</span>
          <span>S/ ${ventaData.igv.toFixed(2)}</span>
        </div>
        <div class="total-row total-final">
          <span>TOTAL:</span>
          <span>S/ ${ventaData.total.toFixed(2)}</span>
        </div>
      </div>

      <div class="info-row">
        <span>Método de Pago: ${ventaData.metodoPago.toUpperCase()}</span>
      </div>

      ${ventaData.observaciones ? `
        <div class="info-row">
          <span>Observaciones: ${ventaData.observaciones}</span>
        </div>
      ` : ''}

      <div class="footer">
        <div>Representación impresa de la Boleta de Venta Electrónica</div>
        <div>Consulte en www.sunat.gob.pe</div>
        <div>¡Gracias por su compra!</div>
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
        body { 
          font-family: Arial, sans-serif; 
          margin: 20px; 
          font-size: 12px;
          line-height: 1.4;
        }
        .header { 
          display: flex;
          justify-content: space-between;
          border-bottom: 2px solid #000; 
          padding-bottom: 15px; 
          margin-bottom: 20px; 
        }
        .company-info {
          flex: 1;
        }
        .company { 
          font-weight: bold; 
          font-size: 18px; 
          margin-bottom: 5px; 
        }
        .document-info {
          flex: 1;
          text-align: right;
        }
        .document-type { 
          font-weight: bold; 
          font-size: 16px; 
          border: 2px solid #000;
          padding: 10px;
          margin-bottom: 10px;
          text-align: center;
        }
        .client-info {
          background-color: #f5f5f5;
          padding: 15px;
          margin: 20px 0;
          border: 1px solid #ddd;
        }
        .info-row { 
          margin: 5px 0; 
        }
        .items-table { 
          width: 100%; 
          border-collapse: collapse; 
          margin: 20px 0; 
        }
        .items-table th, .items-table td { 
          padding: 8px; 
          text-align: left; 
          border: 1px solid #000; 
        }
        .items-table th { 
          background-color: #f0f0f0;
          font-weight: bold; 
        }
        .items-table td.number {
          text-align: right;
        }
        .total-section { 
          border: 2px solid #000; 
          padding: 15px; 
          margin-top: 20px;
          width: 300px;
          margin-left: auto;
        }
        .total-row { 
          display: flex; 
          justify-content: space-between; 
          margin: 5px 0; 
        }
        .total-final { 
          font-weight: bold; 
          font-size: 16px; 
          border-top: 1px solid #000; 
          padding-top: 8px; 
          margin-top: 8px; 
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          font-size: 10px;
          border-top: 1px solid #ccc;
          padding-top: 15px;
        }
        @media print {
          body { margin: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-info">
          <div class="company">MI EMPRESA SAC</div>
          <div>RUC: 20123456789</div>
          <div>Dirección: Av. Principal 123</div>
          <div>Lima, Perú</div>
          <div>Teléfono: (01) 123-4567</div>
          <div>Email: ventas@miempresa.com</div>
        </div>
        <div class="document-info">
          <div class="document-type">
            FACTURA ELECTRÓNICA<br>
            ${ventaData.serie}-${ventaData.numero}
          </div>
          <div class="info-row">
            <strong>Fecha:</strong> ${fecha}
          </div>
          <div class="info-row">
            <strong>Hora:</strong> ${hora}
          </div>
        </div>
      </div>

      <div class="client-info">
        <h3>DATOS DEL CLIENTE</h3>
        <div class="info-row">
          <strong>Razón Social:</strong> ${ventaData.customer?.nombre || 'Cliente General'}
        </div>
        <div class="info-row">
          <strong>RUC:</strong> ${ventaData.customer?.documento || '-'}
        </div>
        <div class="info-row">
          <strong>Dirección:</strong> ${ventaData.customer?.direccion || 'No especificada'}
        </div>
        ${ventaData.customer?.email ? `
          <div class="info-row">
            <strong>Email:</strong> ${ventaData.customer.email}
          </div>
        ` : ''}
      </div>

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
              <td>${item.nombre}<br><small>${item.codigo}</small></td>
              <td class="number">${item.cantidad}</td>
              <td class="number">S/ ${item.precio.toFixed(2)}</td>
              <td class="number">S/ ${item.subtotal.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="total-section">
        <div class="total-row">
          <span>Subtotal:</span>
          <span>S/ ${(ventaData.total / 1.18).toFixed(2)}</span>
        </div>
        <div class="total-row">
          <span>IGV (18%):</span>
          <span>S/ ${ventaData.igv.toFixed(2)}</span>
        </div>
        <div class="total-row total-final">
          <span>TOTAL A PAGAR:</span>
          <span>S/ ${ventaData.total.toFixed(2)}</span>
        </div>
      </div>

      <div style="margin-top: 20px;">
        <div class="info-row">
          <strong>Método de Pago:</strong> ${ventaData.metodoPago.toUpperCase()}
        </div>
        ${ventaData.observaciones ? `
          <div class="info-row">
            <strong>Observaciones:</strong> ${ventaData.observaciones}
          </div>
        ` : ''}
      </div>

      <div class="footer">
        <div><strong>Representación impresa de la Factura Electrónica</strong></div>
        <div>Consulte su documento en www.sunat.gob.pe</div>
        <div>Esta factura ha sido generada electrónicamente</div>
        <div style="margin-top: 10px;">¡Gracias por su confianza!</div>
      </div>
    </body>
    </html>
  `;
};
