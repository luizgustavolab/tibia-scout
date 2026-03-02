import * as React from 'react';
type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
declare const actionTypes: {
  readonly ADD_TOAST: 'ADD_TOAST';
  readonly UPDATE_TOAST: 'UPDATE_TOAST';
  readonly DISMISS_TOAST: 'DISMISS_TOAST';
  readonly REMOVE_TOAST: 'REMOVE_TOAST';
};
type Action =
  | {
      type: typeof actionTypes.ADD_TOAST;
      toast: ToasterToast;
    }
  | {
      type: typeof actionTypes.UPDATE_TOAST;
      toast: Partial<ToasterToast>;
    }
  | {
      type: typeof actionTypes.DISMISS_TOAST;
      toastId?: ToasterToast['id'];
    }
  | {
      type: typeof actionTypes.REMOVE_TOAST;
      toastId?: ToasterToast['id'];
    };
interface State {
  toasts: ToasterToast[];
}
export declare const reducer: (state: State, action: Action) => State;
declare function toast({ ...props }: Omit<ToasterToast, 'id'>): {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
};
declare function useToast(): {
  toast: typeof toast;
  dismiss: (toastId?: string) => void;
  toasts: ToasterToast[];
};
export { useToast, toast };
