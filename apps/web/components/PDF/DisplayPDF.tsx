import {useEffect, useRef, useState} from "react";

import * as pdfJS from 'pdfjs-dist';
import {PDFPageProxy} from 'pdfjs-dist';
import CustomPDFPage from "./CustomPDFPage";
import {GetDocumentParameters} from "pdfjs-dist/types/src/display/api";
import {Pane, Spinner} from "evergreen-ui";

export default function DisplayPDF({
                                       src
                                   }: {
    src: GetDocumentParameters
}) {
    const canvasContainer = useRef<any>(null);
    const [pages, setPages] = useState<PDFPageProxy[]>([]);


    useEffect(() => {
        (async function () {
            // @ts-ignore
            pdfJS.GlobalWorkerOptions.workerSrc =
                window.location.origin + '/pdf.worker.min.js';
            const pdf = await pdfJS.getDocument(src).promise;


            const pagesPromise = []

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                pagesPromise.push(page);
            }
            const pages = await Promise.all(pagesPromise)
            setPages(pages);
        })();
    }, []);


    if (pages.length === 0) {
        return (
            <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
                <Spinner/>
            </Pane>
        )
    }

    return (
        <div>
            {
                pages.map((page, index) =>
                    <CustomPDFPage page={page} key={index} parentContainer={canvasContainer}/>
                )
            }
        </div>
    );

}
