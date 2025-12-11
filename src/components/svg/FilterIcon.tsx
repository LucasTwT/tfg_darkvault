import { DARK_FILTER_ICON, LIGHT_FILTER_ICON } from "@/src/utils/constants";
import {SvgFromXml} from "react-native-svg"

export default  function FilterIcon ({ width, height, dark} : {width: string | number, height: string | number, dark: boolean}) {
    return (
    <SvgFromXml xml={dark ? DARK_FILTER_ICON : LIGHT_FILTER_ICON} width={width} height={height}></SvgFromXml>
    )

}