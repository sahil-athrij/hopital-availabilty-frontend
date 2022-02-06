import {AuthComponent, AuthState} from "../../api/auth";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import React, {createRef, CSSProperties, RefObject} from "react";

interface BubbleContentProps {
    content?: string,
    mime?: string,
    border: CSSProperties,
    attachment?: string,
    messageStyle: CSSProperties

}

class BubbleContent extends AuthComponent<BubbleContentProps, AuthState> 
{
    private observer?: IntersectionObserver;
    private element = createRef<HTMLDivElement|HTMLEmbedElement | HTMLVideoElement | HTMLImageElement>();
    private aTag = createRef<HTMLAnchorElement>();

    constructor(props: BubbleContentProps) 
    {
        super(props);
        this.state = {
            ...this.state
        };
    }

    componentDidMount() 
    {
        super.componentDidMount();
        this.observer = new IntersectionObserver(
            entries => 
            {
                entries.forEach(entry => 
                {
                    const {isIntersecting} = entry;
                    if (isIntersecting) 
                    {
                        if(this.element.current) 
                        
                            if (this.props.attachment) 
                            {
                                if ("src" in this.element.current)
                                    this.element.current.src = this.props?.attachment;
                            }
                            else if ("innerHTML" in this.element.current)
                                this.element.current.innerHTML = this.props.content as string;

                        

                        this.observer = undefined;
                    }
                });
            },
            {
                rootMargin: "500px 0px 200px 0px",
                root: document.querySelector(".chat-main")
            });
        this.observer.observe(this.element.current as Element);
    }

    render(): JSX.Element 
    {
        return <>
            {this.props.content ?
                <div
                    ref={this.element as RefObject<HTMLDivElement>}
                    className="chat-message"/>
                :
                this.props.mime?.startsWith("image") ?
                    <img
                        // src={this.props.attachment}
                        ref={this.element as RefObject<HTMLImageElement>}
                        style={{
                            borderRadius: "25px",
                            ...this.props.border,
                            width: "100%",
                            marginLeft: "0",
                            marginRight: "0",
                        }} alt={"download"}
                    />
                    : this.props.mime?.startsWith("video") ?
                        <video
                            // src={this.props.attachment}
                            ref={this.element as RefObject<HTMLVideoElement>}
                            style={{
                                borderRadius: "25px",
                                ...this.props.border,
                                width: "100%",
                                marginLeft: "0",
                                marginRight: "0",
                            }}
                            controls
                        /> :
                        <object
                            // data={this.props.attachment}
                            type={this.props.mime}
                            style={{
                                borderRadius: "25px",
                                ...this.props.border,
                                width: "100%",
                                marginLeft: "0",
                                marginRight: "0",
                            }}
                            className={"invisible-scroll-bar"}
                            width="100%" height="100%">
                            <embed
                                ref={this.element as RefObject<HTMLEmbedElement>}
                                // src={this.props.attachment}
                                type={this.props.mime}
                                className={"invisible-scroll-bar"}
                                style={{
                                    borderRadius: "25px",
                                    ...this.props.border,
                                    width: "100%",
                                    marginLeft: "0",
                                    marginRight: "0",
                                }}
                                width="100%"
                                height="100%"
                            />

                            <div className={"d-flex justify-content-center"}>

                                <a style={{
                                    ...this.props.messageStyle,
                                    position: "relative"
                                }}
                                href="#"
                                // href={this.props.attachment}
                                ref={this.aTag}
                                download={new Date().toString()}> <InsertDriveFileIcon
                                        sx={{...this.props.messageStyle, fontSize: "2rem"}}/>Download</a>
                            </div>
                        </object>
            }
        </>;


    }
}

export default BubbleContent;
