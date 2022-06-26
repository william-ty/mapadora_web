import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { fr } from "i18n/fr";
import { Footer } from "./Footer";
import { useTranslation } from "react-i18next";

export type Credit = {
  primaryContent: string;
  secondaryContent?: string;
  link: string;
};

const PhotoCreditSection = () => {
  const { t } = useTranslation();
  const credits = fr.translation.credits.content;

  return (
    <>
      {Object.entries(credits)?.map(([key, value]) => {
        return (
          <>
            <Typography variant="h4">
              {t(`credits.content.${key}.title`)}
            </Typography>

            <List>
              {value.content?.map((credit, index) => {
                return (
                  <ListItem key={index} disablePadding divider>
                    <ListItemButton
                      component="a"
                      href={t(`credits.content.${key}.content.${index}.link`)}
                      disableGutters
                    >
                      <ListItemText
                        primary={t(
                          `credits.content.${key}.content.${index}.primaryContent`
                        )}
                        secondary={t(
                          `credits.content.${key}.content.${index}.secondaryContent`
                        )}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </>
        );
      })}
    </>
  );
};

const PhotoCredit = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container sx={{ py: 10 }} maxWidth="lg">
        <Typography variant="h3">{t(`credits.title`)}</Typography>
        <PhotoCreditSection />
      </Container>
      <Footer />
    </>
  );
};

export default PhotoCredit;
