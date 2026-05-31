import CustomeButton from '@/components/Button'
import { Button } from '@/components/ui/button'

function welcome() {
    return (
        <div>welcome

            <CustomeButton
                label='Hello'
                onClick={() => console.log('test')}
            />
        </div>
    )
}

export default welcome