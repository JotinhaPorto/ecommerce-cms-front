import React from 'react'

const Teste = () => {
    return (
        <div>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Clique e selecione uma imagem</p>
                    </div>
                    <Input
                        accept="image/png, image/jpeg"
                        className="hidden"
                        type="file"
                        multiple
                        onChange={(e) => {
                            field.onChange(e.target.files)
                            const files = Array.from(e.target.files ?? []);
                            const transformFile = files.map((file) => URL.createObjectURL(file));
                            setImages(transformFile);
                        }}
                    />
                </label>
            </div>
            <div className="flex gap-x-4">
                {images && images.map((image: any, index) => (
                    <div className="mb-4 flex items-center gap-4" key={image}>
                        <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                            <div className="z-10 absolute top-2 right-2">
                                <Button type="button" onClick={() => onDeleteStateImageAndVaAlueInput(image, index)} variant="destructive" size="sm">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <Image
                                src={image}
                                alt="image"
                                width={300}
                                height={300}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Teste