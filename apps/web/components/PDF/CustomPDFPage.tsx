import {useEffect, useRef} from "react";
import {PDFPageProxy} from "pdfjs-dist";

export default function CustomPDFPage({page, parentContainer, options}: {
    page: PDFPageProxy,
    parentContainer: any,
    options?: Object
}) {
    const canvasRef = useRef<any>(null);

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
    }, [])


    return <canvas ref={canvasRef} style={{height: '100vh'}}/>;
}
