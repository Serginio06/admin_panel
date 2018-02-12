import * as React from "react";
import ImageUploader from "react-images-upload";

export interface IImgUploaderProps {

}

export interface IImgUploaderState {
    pictures: string[];
}

export class ImgUploader extends React.Component<IImgUploaderProps, IImgUploaderState> {

    constructor(props: IImgUploaderProps) {
        super(props);
        this.state = {
            pictures: [],
        };
        this.onDrop = this.onDrop.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div className="imgUploader-wrapper">
                <ImageUploader
                    withIcon={false}
                    buttonText="Choose images"
                    onChange={this.onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    withPreview
                />

                <img src="" alt="" id="myimage"/>
            </div>
        );
    }

    private onDrop(pictures: any[]): void {
        this.onFileSelected(pictures[0]);

        this.setState({
            pictures: this.state.pictures.concat(pictures),
        });
    }

    private onFileSelected(selectedFile: File): void {
        // var selectedFile = event.target.files[0];
        const reader: FileReader = new FileReader();

        const imgTag: HTMLImageElement = document.getElementById("myimage") as HTMLImageElement;
        imgTag.title = selectedFile.name;

        reader.onload = () => {
            imgTag.src = reader.result;
        };
        reader.readAsDataURL(selectedFile);
    }
}
