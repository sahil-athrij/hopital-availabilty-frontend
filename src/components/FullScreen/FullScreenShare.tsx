import {Container} from "react-bootstrap";
import {AuthComponent, AuthState} from "../../api/auth";
import {
    AiFillLinkedin,
    AiFillRedditCircle,
    AiFillTwitterCircle,
    BiDotsHorizontalRounded,
    HiOutlineClipboardCopy,
    IoLogoWhatsapp,
    RiFacebookCircleFill,
    SiGmail
} from "react-icons/all";
import {toast} from "react-toastify";
import React from "react";
import {FullScreenLocationProps} from "./FullScreenLocation";

import "./sharebuttons.css";

interface ShareBoxProps extends FullScreenLocationProps {
    url: string
}

export class ShareBox extends AuthComponent<ShareBoxProps, AuthState> 
{
    fbs_click = () => 
    {
        window.open(`https://www.facebook.com/sharer.php?u=https://needmedi.com&quote=Welcome to Needmedi.com%0A
${this.state.user?.username} has invited you to join their friend network on Need Medical care`, "sharer");
        return false;
    };


    tbs_click = () => 
    {
        window.open(`https://twitter.com/intent/tweet?text=Welcome to Needmedi.com %0A
${this.state.user?.username} has invited you to join their friend network on Need Medical care&url=${this.props.url}`, "sharer");
        return false;
    };

    lbs_click = () => 
    {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?quote=Welcome to Needmedi.com %0A
${this.state.user?.username} has invited you to join their friend network on Need Medical care&url=${this.props.url}`, "sharer");
        return false;
    };

    rbs_click = () => 
    {
        window.open(`https://www.reddit.com/submit?title=Welcome to Needmedi.com&
        text=${this.state.user?.username} has invited you to join their friend network on Need Medical care&url=${this.props.url}`, "sharer");
        return false;
    };

    whs_click = () => 
    {
        window.open(`https://wa.me?text=Welcome to Needmedi.com %0A
${this.state.user?.username} has invited you to join their friend network on Need Medical care %0A  ${encodeURIComponent(this.props.url)}`, "sharer");
        return false;
    };

    ma_click = () => 
    {
        window.open(`mailto:?subject= I want to share this with you &amp;body=Welcome to Needmedi.com %0A
${this.state.user?.username} has invited you to join their friend network on Need Medical care %0A  ${this.props.url}`, "sharer");
        return false;
    };

    cp_click = () => 
    {
        navigator.clipboard.writeText(`Welcome to Needmedi.com \n
${this.state.user?.username} has invited you to join their friend network on Need Medical care \n  ${this.props.url}`).then(() => 
        {
            toast.dark("Copied to Clipboard", {
                position: "bottom-center",
            });
        });
    };

    mr_click = () => 
    {
        if (navigator.share) 
        
            navigator.share({
                title: "Need Medi Invite",
                url: this.props.url,
                text: `${this.state.user?.username} has invited you to join their friend network on Need Medical care`
            }).then(() => 
            {
                toast.dark("Share Successful", {
                    position: "bottom-center",
                });
            });
        
        else 
        
            toast.error("Your Browser Does not Support Direct Sharing", {
                position: "bottom-center",
            });
        
    };

    render() 
    {

        return (
            <>

                <div className="text-left p-3 d-flex flex-row flex-wrap justify-content-between w-100">
                    {/*FACEBOOK*/}
                    <RiFacebookCircleFill className="fb-h" size={50} onClick={this.fbs_click}/>

                    {/*TWITTER */}
                    <AiFillTwitterCircle className="tw-h" size={50} onClick={this.tbs_click}/>

                    {/*LINKEDIN*/}
                    <AiFillLinkedin className="li-h" size={50} onClick={this.lbs_click}/>

                    {/*REDDIT */}
                    <AiFillRedditCircle className="re-h" size={50} onClick={this.rbs_click}/>

                </div>
                <div className="text-left p-3 d-flex flex-row flex-wrap justify-content-between w-100">
                    {/*Whatsapp*/}
                    <IoLogoWhatsapp className="wh-h" size={50} onClick={this.whs_click}/>
                    {/*mail*/}
                    <SiGmail className="ma-h" size={50} onClick={this.ma_click}/>
                    {/*copy to clipboard*/}
                    <HiOutlineClipboardCopy size={50} onClick={this.cp_click}/>
                    {/*    other*/}
                    <BiDotsHorizontalRounded size={50} onClick={this.mr_click}/>
                </div>
            </>
        );
    }

}

export class FullScreenShare extends AuthComponent<ShareBoxProps, AuthState> 
{

    render() 
    {
        return (
            <div
                className="d-flex  fixed-top w-100 h-100 z-index-1031 translucent-background  header align-items-end flex-column">
                <button className="w-100 flex-fill"
                    onClick={
                        this.props.close
                    }/>
                <Container fluid={true}
                    className="bg-white pt-2 flex-column top-radius-round d-flex align-items-start">
                    <Container fluid={true} className="py-3 text-left justify-content-start small-border-full">
                        <div className="h5 m-0 font-weight-bolder">
                            INVITE FRIENDS
                        </div>
                        <div className="m-0 ">
                            invite your friends to the app to earn points
                        </div>
                    </Container>
                    <ShareBox url={this.props.url} close={() => 
                    {
                        this.props.close();
                    }}/>

                </Container>

            </div>);
    }
}
