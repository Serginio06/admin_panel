import * as React from "react";
import {Button, HelpBlock, OverlayTrigger, Tooltip} from "react-bootstrap";

interface ILogoUploaderProps {
    tooltipPresent: boolean;
    picUploadClass?: string;
    buttonLabel: string;
    pictureSrc: string;
    label: string;
    validationLevel: string;
    validationMessage: string;
    tooltipText: string;
    isStar?: boolean;
    buttonInfo?: string;

    onUploadImage: (file: File, isImgExtAllowed?: boolean, isImgSizeExceeded?: boolean) => void;
}

interface ILogoUploaderState {
}

export class LogoUploader extends React.Component<ILogoUploaderProps, ILogoUploaderState> {

    constructor(props: ILogoUploaderProps) {
        super(props);
    }

    public render(): JSX.Element {
        const {
            label,
            tooltipPresent,
            tooltipText,
            validationLevel,
            validationMessage,
            picUploadClass,
            pictureSrc,
            buttonLabel,
            isStar,
            buttonInfo
        } = this.props;

        const pic: string = pictureSrc || require("../../../resources/icons/noImage.png");

        const tooltip = (
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
            <HelpBlock className={"warning-text photo-hint"}>{validationMessage}</HelpBlock>
        ) : null;

        const starEl = isStar ? <span>*</span> : <span/>;

        return (
            <div className={"picUpload__wrapper " + picUploadClass + " " + validationLevel}>
                <div className="companyReg__picUploader-wrapper">
                    <div className="companyReg__picUploader__img-wrapper">
                        <div className="input_label_and_questionMark__wrapper">
                            <label htmlFor="" className="inputLabel">{starEl}{label}</label>
                            {overlayTrigger}
                        </div>
                        <img src={pic} alt="" className="logo-w62"/>
                    </div>

                    <div className="companyReg__picUploader__btn-wrapper">
                        <input
                            type="file"
                            onChange={this.onUploadInputChange}
                            id="inputLogoPicUpload__logoBtn"
                            accept=".jpg,.jpeg,.gif,.png,.gif"/>
                        <div id="companyReg__logoBtn">
                            <Button
                                className="grey_btn"
                                onClick={this.onUploadLogoButtonClick}>
                                {buttonLabel}
                            </Button>
                            <span>{buttonInfo}</span>
                        </div>
                    </div>
                </div>

                <div className="subInput__info-wrapper">
                    {helpBlock}
                </div>
            </div>
        );
    }

    private onUploadLogoButtonClick = (): void => {
        const elem = document.getElementById("inputLogoPicUpload__logoBtn");
        elem.click();
    };
    private onUploadInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const selectedFile: File = (event.target as HTMLInputElement).files[0];
        const allowedImgExtension: string[] = [".jpg", ".jpeg", ".gif", ".png", ".gif"];
        const imageMaxSize: number = 100000;

        const isImgExtAllowed: boolean = this.hasExtension(selectedFile.name, allowedImgExtension);
        const isImgSizeExceeded: boolean = selectedFile.size <= imageMaxSize;

        if (isImgExtAllowed && isImgSizeExceeded) {
            this.props.onUploadImage(selectedFile);
        } else {
            this.props.onUploadImage(null, isImgExtAllowed, isImgSizeExceeded);
        }

        const elem: HTMLInputElement = document.getElementById("inputLogoPicUpload__logoBtn") as HTMLInputElement;
        elem.value = "";
    };
    private hasExtension = (fileName: string, imgExtensions: string[]): boolean => {
        return new RegExp("(" + imgExtensions.join("|").replace(/\./g, "\\.") + ")$").test(fileName);
    };
}
