import { CartItem } from '../contexts/CartContext';
import { DeliveryData } from '../pages/DeliveryInfo';
import { PaymentData } from '../pages/PaymentInfo';
export function generateWhatsAppMessage(cart: CartItem[], total: number, deliveryData: DeliveryData, paymentData: PaymentData): string {
  // Número da Perfumaria Golden
  const phoneNumber = '5516997320195';

  // Build message with simple characters (no emojis that break encoding)
  let message = '*PERFUMARIA GOLDEN*\n';
  message += '================================\n\n';
  message += '*DADOS DO CLIENTE:*\n';
  message += `Nome: ${paymentData.nomeCompleto}\n`;
  message += `Celular: ${paymentData.celular}\n`;
  if (paymentData.celularSecundario) {
    message += `Celular 2: ${paymentData.celularSecundario}\n`;
  }
  message += '\n';
  message += '*ENDERECO DE ENTREGA:*\n';
  message += `${deliveryData.rua}\n`;
  message += `Bairro: ${deliveryData.bairro}\n`;
  message += `Cidade: ${deliveryData.cidade}\n`;
  message += `CEP: ${deliveryData.cep}\n`;
  if (deliveryData.pontoReferencia) {
    message += `Ponto de Referencia: ${deliveryData.pontoReferencia}\n`;
  }
  message += '\n';
  message += '*PEDIDO:*\n\n';
  cart.forEach(item => {
    message += `> ${item.quantity}x *${item.name}*\n`;
    message += `  Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
  });
  message += '================================\n';
  message += `*TOTAL DO PEDIDO: R$ ${total.toFixed(2)}*\n`;
  message += '================================\n\n';
  message += '*FORMA DE PAGAMENTO:*\n';
  message += `${paymentData.formaPagamento}\n\n`;
  if (paymentData.observacoes) {
    message += '*OBSERVACOES:*\n';
    message += `${paymentData.observacoes}\n\n`;
  }
  message += 'Aguardo confirmacao de disponibilidade!\n\n';
  message += 'Obrigado(a)!';

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}