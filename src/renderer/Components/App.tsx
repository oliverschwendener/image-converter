import {
    Button,
    Field,
    FluentProvider,
    Input,
    ProgressBar,
    Switch,
    webDarkTheme,
    webLightTheme,
    type Theme,
} from "@fluentui/react-components";
import { FolderRegular, PlayRegular } from "@fluentui/react-icons";
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
    const [quality, setQuality] = useState<number>(80);
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
                quality,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setConversionStatus({ conversionInProgress: false });
        }
    };

    const serializeQuality = (value: string) => {
        let numericalValue = Number(value);

        if (numericalValue < 0) {
            numericalValue = 0;
        }

        if (numericalValue > 100) {
            numericalValue = 100;
        }

        return numericalValue;
    };

    return (
        <FluentProvider theme={ThemeMapping[themeName]} style={{ height: "100vh" }}>
            <div
                style={{
                    alignItems: "center",
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
                            value={sourceFolderPath ?? ""}
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
                    <Field label="Resize">
                        <Switch checked={shouldResize} onChange={(_, { checked }) => setShouldResize(checked)} />
                    </Field>
                    {}
                    <Field label="Fit into">
                        <Input
                            disabled={!shouldResize}
                            type="number"
                            min={0}
                            value={`${fitInto}`}
                            onChange={(_, { value }) => setFitInto(Number(value))}
                        />
                    </Field>
                    <Field label="Quality (value between 0-100)">
                        <Input
                            type="number"
                            min={0}
                            max={100}
                            value={`${quality}`}
                            onChange={(_, { value }) => setQuality(serializeQuality(value))}
                        />
                    </Field>
                    <Button
                        disabled={!sourceFolderPath || !destinationFolderPath}
                        icon={<PlayRegular />}
                        iconPosition="after"
                        size="large"
                        onClick={() => convertImages()}
                    >
                        Convert to JPG
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
