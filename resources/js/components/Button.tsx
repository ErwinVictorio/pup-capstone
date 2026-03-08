
import { Button } from './ui/button'
interface buttonType {
    label: string,
    onClick: () => void
}

function CustomeButton({ label, onClick }: buttonType) {
    return (
        <Button
            variant={'default'}
            onClick={onClick}>
            {label}
        </Button>
    )
}

export default CustomeButton