import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0, transition:{duration:0.3, ease: "easeIn"} }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-[576px] sm:w-full max-w-[576px] rounded-[16px] border border-[#10B981] p-[33px] sm:px-[12px] flex flex-col space-y-7 sm:space-y-4 bg-[#000000] relative"
  >
        <button className="absolute top-4 right-4  text-gray-600" onClick={onClose}>
          ✕
        </button>
        {children}
      </motion.div>
    </div>
  );
}
