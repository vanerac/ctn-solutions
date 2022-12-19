import {useEffect, useRef, useState} from "react";
import {PDFPageProxy} from "pdfjs-dist";
import SignatureCanvas from 'react-signature-canvas'
import {SignatureAnchors} from "../../../../libs/SDK";

export default function CustomPDFPage({page, parentContainer, pageNr, signatureAnchors, options}: {
    page: PDFPageProxy,
    parentContainer: any,
    pageNr: number,
    signatureAnchors?: SignatureAnchors[]
    options?: Object
}) {
    const canvasRef = useRef<any>(null);
    const sigRef = useRef<any>(null);
    const [viewport, setViewport] = useState<any>(null);
    const [computedSigAnchors, setComputedSigAnchors] = useState<SignatureAnchors[]>([]);


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

    useEffect(() => {
        if (!viewport) return;
        if (!signatureAnchors) return;

        signatureAnchors = signatureAnchors.map(anchor => {
            const xScale = viewport.width / (anchor?.winWidth ?? 1);
            const yScale = viewport.height / (anchor.winHeight ?? 2);

            return {
                ...anchor,
                left: (anchor.left as number) * xScale,
                top: (anchor.top as number) * yScale,
                width: (anchor.width as number) * xScale,
                height: (anchor.height as number) * yScale,
                originalLeft: anchor.left,
                originalTop: anchor.top

            }
        })

        const pageSignatureAnchors = signatureAnchors.filter((signatureAnchor) => {
            const {top} = signatureAnchor;

            const pageBounderies = {
                top: pageNr * viewport.height,
                bottom: (pageNr + 1) * viewport.height,
            }

            return !((top as number) > pageBounderies.top && (top as number) < pageBounderies.bottom);
        })

        const newAnchors = pageSignatureAnchors.map((signatureAnchor) => {
            const {height, left, top, width} = signatureAnchor;
            return {
                y: (top as number) - ((pageNr - 1) * (viewport.height)),
                x: left as number,
                height: height as number,
                width: width as number
            }
        })

        setComputedSigAnchors(newAnchors);
    }, [viewport])

    console.log(computedSigAnchors);

    return (
        <div style={{position: "relative"}}>
            <canvas ref={canvasRef} style={{height: '100vh'}}/>
            {/*TODO: Add signature module*/}
            {
                computedSigAnchors?.map((signatureAnchor, index) => {
                    const {height, left, top, width} = signatureAnchor;
                    return (
                        <SignatureCanvas
                            key={index}
                            ref={sigRef}
                            canvasProps={{
                                width: width,
                                height: height,
                                style: {
                                    position: "absolute",
                                    top: (top as any),
                                    zIndex: 100,
                                    left: left,
                                    border: "1px solid black",
                                    backgroundColor: "white"
                                }
                            }}
                            {...options}
                        />
                    )
                })
            }
        </div>
    );
}
