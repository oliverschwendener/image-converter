import type { ConversionOptions } from "@common/ConversionOptions";
import {
    Button,
    Dropdown,
    Field,
    FluentProvider,
    Input,
    Option,
    ProgressBar,
    Slider,
    Switch,
    webDarkTheme,
    webLightTheme,
    type Theme,
} from "@fluentui/react-components";
import { FolderRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";

type ThemeName = "Light" | "Dark";

const getThemeName = (): ThemeName => (window.ContextBridge.themeShouldUseDarkColors() ? "Dark" : "Light");

const ThemeMapping: Record<ThemeName, Theme> = {
    Dark: webDarkTheme,
    Light: webLightTheme,
};

type ConversionStatus = {
    conversionInProgress: boolean;
};

export const App = () => {
    const [themeName, setThemeName] = useState<ThemeName>(getThemeName());
    const [sourceFolderPath, setSourceFolderPath] = useState<string | undefined>(undefined);
    const [destinationFolderPath, setDestinationFolderPath] = useState<string | undefined>(undefined);
    const [shouldResize, setShouldResize] = useState<boolean>(false);
    const [fitInto, setFitInto] = useState<number>(800);
    const [format, setFormat] = useState<ConversionOptions["format"]>("JPEG");
    const [quality, setQuality] = useState<number>(80);
    const [openFolderAfterConversion, setOpenFolderAfterConversion] = useState<boolean>(false);
    const [conversionStatus, setConversionStatus] = useState<ConversionStatus>({ conversionInProgress: false });

    useEffect(() => {
        window.ContextBridge.onNativeThemeChanged(() => setThemeName(getThemeName()));
    }, []);

    const selectFolder = () => window.ContextBridge.selectFolder();

    const selectSourceFolder = async () => {
        const { folderPath } = await selectFolder();

        if (folderPath) {
            setSourceFolderPath(folderPath);
        }
    };

    const selectDestinationFolder = async () => {
        const { folderPath } = await selectFolder();

        if (folderPath) {
            setDestinationFolderPath(folderPath);
        }
    };

    const convertImages = async () => {
        if (!sourceFolderPath || !destinationFolderPath) {
            throw new Error(`Source folder path or destination folder path not set`);
        }

        setConversionStatus({ conversionInProgress: true });

        try {
            await window.ContextBridge.convertImages({
                sourceFolderPath,
                destinationFolderPath,
                shouldResize,
                fitInto,
                format,
                quality,
                openFolderAfterConversion,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setConversionStatus({ conversionInProgress: false });
        }
    };

    const serializeQuality = (value: number) => {
        if (value < 0) {
            value = 0;
        }

        if (value > 100) {
            value = 100;
        }

        return value;
    };

    return (
        <FluentProvider theme={ThemeMapping[themeName]} style={{ height: "100vh" }}>
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    padding: 20,
                    boxSizing: "border-box",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
                    <Field label="Source folder path">
                        <Input
                            readOnly
                            value={sourceFolderPath ?? ""}
                            onClick={() => {
                                if (!sourceFolderPath) {
                                    selectSourceFolder();
                                }
                            }}
                            contentAfter={
                                <Button
                                    appearance="transparent"
                                    size="small"
                                    onClick={() => selectSourceFolder()}
                                    icon={<FolderRegular />}
                                />
                            }
                        />
                    </Field>
                    <Field label="Destination folder path">
                        <Input
                            readOnly
                            value={destinationFolderPath ?? ""}
                            onClick={() => {
                                if (!destinationFolderPath) {
                                    selectDestinationFolder();
                                }
                            }}
                            contentAfter={
                                <Button
                                    onClick={() => selectDestinationFolder()}
                                    appearance="transparent"
                                    size="small"
                                    icon={<FolderRegular />}
                                />
                            }
                        />
                    </Field>

                    <Field label="Format">
                        <Dropdown
                            value={format}
                            onOptionSelect={(_, { optionValue }) => setFormat(optionValue as "JPEG" | "PNG")}
                        >
                            <Option text="JPEG" value="JPEG">
                                JPEG
                            </Option>
                            <Option text="PNG" value="PNG">
                                PNG
                            </Option>
                        </Dropdown>
                    </Field>

                    <Field label="Resize">
                        <Switch checked={shouldResize} onChange={(_, { checked }) => setShouldResize(checked)} />
                    </Field>

                    {shouldResize ? (
                        <Field label="Fit into">
                            <Input
                                disabled={!shouldResize}
                                type="number"
                                min={0}
                                value={`${fitInto}`}
                                onChange={(_, { value }) => setFitInto(Number(value))}
                            />
                        </Field>
                    ) : null}

                    {format === "JPEG" ? (
                        <Field label={`Quality: ${quality}`}>
                            <Slider
                                type="number"
                                min={0}
                                max={100}
                                value={quality}
                                onChange={(_, { value }) => setQuality(serializeQuality(value))}
                            />
                        </Field>
                    ) : null}

                    <Field label="Open folder after conversion">
                        <Switch
                            checked={openFolderAfterConversion}
                            onChange={(_, { checked }) => setOpenFolderAfterConversion(checked)}
                        />
                    </Field>

                    <Button
                        disabled={!sourceFolderPath || !destinationFolderPath}
                        size="large"
                        onClick={() => convertImages()}
                    >
                        Convert to {format}
                    </Button>

                    {conversionStatus.conversionInProgress ? (
                        <Field validationMessage="Converting..." validationState="none">
                            <ProgressBar />
                        </Field>
                    ) : null}
                </div>
            </div>
        </FluentProvider>
    );
};
