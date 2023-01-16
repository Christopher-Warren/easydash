import PageWrapper from "../PageWrapper";

import { toggleModal } from "../../redux/modal/modalSlice";

import { useAppDispatch } from "../../redux/hooks";
// import customPrompt from "../../utils/customPrompt";
import InfoCardLarge from "../cards/InfoCardLarge";

type size = "max-w-3xl" | "max-w-4xl" | "max-w-5xl" | "max-w-6xl" | "max-w-7xl";
export interface PromptTypes {
  title: string;
  body: string;
  confirm: string;
  cancel: string;
}
type ModalProps = {
  className?: string;
  title: string;
  children: any;
  size: size;
  opts?: PromptTypes;
  hasChanged?: boolean;
};

const ModalContainer = ({ children, size, title, className }: ModalProps) => {
  return (
    <div>
      <div className={`${size} max-w-7xl max-w mx-auto`}>
        <PageWrapper>
          <div className="w-full left-0 z-30 modal-anims  transition-all duration-100">
            <InfoCardLarge title={title} className={className}>
              {children}
            </InfoCardLarge>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};

export default ModalContainer;
