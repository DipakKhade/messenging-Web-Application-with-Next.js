import { cva , VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, FC } from "react";
import { cn } from "@/lib/utils";

const buttonVarients = cva(
  "active:scale-95 inline-flex item-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-event-none",
  {
    variants: {
      varient: {
        default: "bg-slate-900 text-white hover:bg-slate-800",
        ghost: "bg-transparent hover:text-slate-900 hover:bg-slate-200 ",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      varient: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> , VariantProps<typeof buttonVarients> {
    isLoading?:boolean
}

const Button: FC<ButtonProps> = ({className,children,varient,isLoading,size, ...props}) => {
  return <button className={cn(buttonVarients({varient,size,className})) }disabled={isLoading} {...props}>
    {isLoading? <Loader2 className="mr-2 h-4 animate-spin"/>:null}
    {children}
  </button>;
};

export default Button;
