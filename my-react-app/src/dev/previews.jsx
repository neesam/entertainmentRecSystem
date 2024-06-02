import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Budget from "../Pages/Budget";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Budget">
                <Budget/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews