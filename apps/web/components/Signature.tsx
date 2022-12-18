import SignatureCanvas from 'react-signature-canvas'
import {useRef} from "react";
import {Button} from "evergreen-ui";


export default function Signature() {

    const sigRef = useRef<any>()

    return (
        <div className="border-slate-200 w-full">
            <SignatureCanvas penColor='black'
                             canvasProps={{
                                 width: 500,
                                 height: 200,
                                 className: 'sigCanvas bg-white border rounded shadow w-full h-full'
                             }}
                             ref={sigRef}
            />
            <div className="flex flex-row">
                <Button alignContent={"center"}
                        appearance={
                            "minimal"
                        }
                        intent={
                            "danger"
                        }
                        onClick={() => {
                            sigRef?.current?.clear()
                        }}>
                    Clear
                </Button>

            </div>

        </div>
    )
}
