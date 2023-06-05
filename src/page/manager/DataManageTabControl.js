import ContainerTabControl from "./container/ContainerTabControl";
import PaletteTabControl from "./palette/PaletteTabControl";

const DataManageTabControl = (props) => {
    if (props.tab === 'container')
        return (<ContainerTabControl containerRef={props.containerRef}/>)
    else if (props.tab === 'palette')
        return (<PaletteTabControl paletteRef={props.paletteRef}/>)
}

export default DataManageTabControl