import { Alert } from "react-bootstrap";

export const Message = ({ variant = "info", children } : {variant:string, children:any}) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}