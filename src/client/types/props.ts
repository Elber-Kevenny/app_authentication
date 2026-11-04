export interface DashboardProps {
  username?: string;
}

export interface LoginProps {
  initialIsRegister?: boolean;
}

export interface FormCpProps {
  isRegister?: boolean;
  title: string;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword?: string;
  setConfirmPassword?: (value: string) => void;
  message: string;
  switchMessage: string;
  switchLinkText: string;
  handleSubmit: (e: React.SubmitEvent) => void;
  handleSwitchPage: (e: React.MouseEvent) => void;
}
