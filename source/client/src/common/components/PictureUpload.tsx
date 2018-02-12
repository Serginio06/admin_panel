import * as React from "react";
import {CSSProperties} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Button, HelpBlock, OverlayTrigger, Tooltip} from "react-bootstrap";

const dropFiles = require("../../../resources/icons/noImage.png");

const getItemStyle = (index: number, draggableStyle: CSSProperties, isDragging: boolean): CSSProperties => ({
    cursor: "-webkit-grab",
    opacity: isDragging ? 0.5 : 1,
    userSelect: "none",
    ...draggableStyle,
});
const getListStyle = (isDragging: boolean, draggableStyle?: CSSProperties): CSSProperties => ({
    display: "inline-flex",
    position: "relative",
    width: "100%",
    ...draggableStyle,
});

interface IPictureUploadProps {
    isDisabled?: boolean;
    tooltipPresent: boolean;

    picUploadClass: string;
    label: string;
    validationLevel: string;
    validationMessage: string;
    tooltipText: string;

    picturesSrc: any[];

    onChangePicturesOrder: (items) => void;
    onProductUploadImage: (selectedFile, isImgExtAllowed?, isImgSizeExceeded?) => void;
    onDeletePicture: (id) => void;
    isStar?: boolean;
}

interface IPictureUploadState {
}

export class PictureUpload extends React.Component<IPictureUploadProps, IPictureUploadState> {

    public render(): JSX.Element {
        const {
            label,
            tooltipPresent,
            tooltipText,
            validationLevel,
            validationMessage,
            picUploadClass,
            picturesSrc,
            isStar,
        } = this.props;

        const tt = (items) => {
            items.length = 5;
            for (let i = 0; i < items.length; i++) {
                if (!items[i]) {
                    items[i] = "";
                }
            }
            return items;
        };

        let pictures: any[] = picturesSrc.slice();
        pictures = pictures.length === 5 ? pictures : tt(pictures);

        const tooltip: JSX.Element = (
            <Tooltip id="tooltip"><strong>{tooltipText}</strong></Tooltip>
        );

        const overlayTrigger: JSX.Element = tooltipPresent ? (
            <OverlayTrigger
                placement="top"
                overlay={tooltip}
            >
                <div className="questionMark">?</div>
            </OverlayTrigger>
        ) : null;

        const helpBlock: JSX.Element = validationLevel ? (
            <HelpBlock className={"warning-text"}>{validationMessage}</HelpBlock>
        ) : null;

        const isDisabled: boolean = pictures && !pictures.includes("");
        const starEl: JSX.Element = isStar ? <span>*</span> : <span/>;

        return (
            <div className={"picUpload__wrapper " + picUploadClass + " " + validationLevel}>
                <div className="input_label_and_questionMark__wrapper">
                    <label htmlFor="" className="inputLabel">{starEl}{label}</label>
                    {overlayTrigger}
                </div>

                {/* {picturesSrc.length > 0 && */}
                    <DragDropContext onDragEnd={null || this.onDragEnd}>
                    <Droppable
                    droppableId="droppable"
                    direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            className="picUpload__logoUpload-wrapper"
                        >
                            {pictures.map((item: string, index: number) => {
                                    if (item !== "") {
                                        return (
                                            <Draggable key={index} draggableId={index}>
                                                {(provided, snapshot) => {
                                                    return <div className={index ? "logo-w60" : "logo-w115"}>
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            className={index ? "smallLogo-wrapper" : "bigLogo-wrapper"}
                                                            style={item !== "" ? getItemStyle(
                                                                index,
                                                                provided.draggableStyle,
                                                                snapshot.isDragging,
                                                            ) : {}}>
                                                            <img
                                                                src={item || dropFiles}
                                                                ref={provided.innerRef}
                                                            />
                                                            {item !== "" && <span
                                                                className="logo_cancel_btn"
                                                                id={`${index}`}
                                                                onClick={this.onImgDeleteClick}>
                                                                {"×"}
                                                            </span>}
                                                        </div>
                                                    </div>;
                                                }}
                                            </Draggable>
                                        );
                                    }
                                    return (
                                        <img
                                            key={index}
                                            src={dropFiles}
                                            className={(index === 0 && item === "") ? "logo-w115" : "logo-w60"}
                                            ref={provided.innerRef}
                                        />
                                    );
                                },
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
                    </DragDropContext>
                {/* } */}

                <span className="picUpload__span_maxLength__outArray">
                    {"Upload Min 1 pic. Up to 5 pics. Max 100KB each"}
                </span>

                <input
                    multiple
                    type="file"
                    id="inputPicUpload__logoBtn"
                    accept=".jpg,.jpeg,.gif,.png,.gif"
                    onChange={this.onUploadInputChange}/>

                <Button
                    className="grey_btn"
                    id="picUpload__logoBtn"
                    onClick={this.onUploadLogoButtonClick}
                    disabled={isDisabled}>
                    {"Upload Pics"}
                </Button>

                <div className="subInput__info-wrapper">
                    {helpBlock}
                </div>
            </div>
        );
    }

    private onImgDeleteClick = (e: React.FormEvent<HTMLSpanElement>): void => {
        this.props.onDeletePicture((e.target as HTMLSpanElement).id);
    };

    private onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = this.reorder(
            this.props.picturesSrc,
            result.source.index,
            result.destination.index,
        );

        this.props.onChangePicturesOrder(items);
    };

    private reorder = (list: any[], startIndex: number, endIndex: number) => {
        // tslint:disable-next-line
        const result: any[] = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    private onUploadLogoButtonClick = (): void => {
        const elem = document.getElementById("inputPicUpload__logoBtn");
        elem.click();
    };

    private onUploadInputChange = (event): void => {
        const allowedImgExtension: string[] = [".jpg", ".jpeg", ".gif", ".png"];
        const imageMaxSize: number = 100000;

        let maxLength: number = 0;

        if (event.target.files) {
            maxLength = event.target.files.length;

            if (maxLength > 5) {
                maxLength = 5;
            }
        }

        for (let i: number = 0; i < maxLength; i++) {
            const selectedFile: File = event.target.files[i];

            const isImgExtAllowed: boolean = this.hasExtension(selectedFile.name, allowedImgExtension);
            const isImgSizeExceeded: boolean = selectedFile.size <= imageMaxSize;

            if (isImgExtAllowed && isImgSizeExceeded) {
                this.props.onProductUploadImage(selectedFile);
            } else {
                this.props.onProductUploadImage("", isImgExtAllowed, isImgSizeExceeded);
            }
        }

        const elem = document.getElementById("inputPicUpload__logoBtn") as HTMLInputElement;
        elem.value = "";
    };

    private hasExtension = (fileName: string, imgExtension: string[]): boolean => {
        return new RegExp("(" + imgExtension.join("|").replace(/\./g, "\\.") + ")$").test(fileName);
    };

}
