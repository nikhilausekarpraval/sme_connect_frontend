import * as React from "react";
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';
export class AscSortSVG extends React.Component {
    render() {
        return (
                <CaretUpFill />

        );

    }
}

export class DescSortSVG extends React.Component {
    render() {
        return (
                <CaretDownFill />
        );
    }
}
