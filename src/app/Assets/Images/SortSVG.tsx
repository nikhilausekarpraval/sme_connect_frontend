import * as React from "react";
import { BiSolidDownArrow ,BiSolidUpArrow} from "react-icons/bi";
export class AscSortSVG extends React.Component {
    render() {
        return (
                <BiSolidUpArrow />

        );

    }
}

export class DescSortSVG extends React.Component {
    render() {
        return (
                <BiSolidDownArrow />
        );
    }
}
