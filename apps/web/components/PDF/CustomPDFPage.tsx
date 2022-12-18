import {useEffect, useRef, useState} from "react";
import {PDFPageProxy} from "pdfjs-dist";
import SignatureCanvas from 'react-signature-canvas'

export default function CustomPDFPage({page, parentContainer, options}: {
    page: PDFPageProxy,
    parentContainer: any,
    options?: Object
}) {
    const canvasRef = useRef<any>(null);
    const sigRef = useRef<any>(null);
    const [viewport, setViewport] = useState<any>(null);

    console.log(page);

    useEffect(() => {
        const viewport = page.getViewport({scale: 1});

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        parentContainer?.current?.appendChild(canvas);

        const renderContext = {canvasContext: ctx, viewport};

        page.render(renderContext);
        setViewport(viewport);
    }, [])


    return (
        <div style={{position: "relative"}}>
            <canvas ref={canvasRef} style={{height: '100vh'}}/>
            {/*TODO: Add signature module*/}
            <div style={{
                position: "absolute",
                top: (viewport?.height ?? 0) / 2,
                left: (viewport?.width ?? 0) / 2,
                // width: '100%',
                // height: '100%',
                backgroundColor: 'rgba(0,0,0x,0.5)'
            }}>
                <SignatureCanvas penColor='black'
                                 canvasProps={{
                                     width: 500 / 3,
                                     height: 200 / 3,
                                     className: 'sigCanvas bg-white border rounded shadow w-full h-full'
                                 }}
                                 velocityFilterWeight={0.5}
                                 dotSize={((500 / 3) + (200 / 3)) / 4}
                                 throttle={0}
                                 ref={sigRef}
                />

            </div>
        </div>
    );
}
