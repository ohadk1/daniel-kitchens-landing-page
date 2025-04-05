
import { WhatsappIcon } from './Icons';

const FloatingButton = () => {
  return (
    <a
      href="https://wa.me/972000000000?text=אשמח%20לקבל%20הצעת%20מחיר%20למטבח%20חדש"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-transform duration-300 hover:scale-110"
      aria-label="צור קשר בוואטסאפ"
    >
      <WhatsappIcon className="h-6 w-6" />
    </a>
  );
};

export default FloatingButton;
