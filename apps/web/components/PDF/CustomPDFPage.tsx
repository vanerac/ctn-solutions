import {useEffect, useRef, useState} from "react";
import {PDFPageProxy} from "pdfjs-dist";

export default function CustomPDFPage({page, parentContainer, options}: {
    page: PDFPageProxy,
    parentContainer: any,
    options?: Object
}) {
    const canvasRef = useRef<any>(null);
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
                width: '25%',
                height: '8%',
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}>
                <button
                    onClick={() => alert('Hello')}
                >Sign
                </button>
            </div>
        </div>
    );
}
