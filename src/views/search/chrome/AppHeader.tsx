import ReactGA from "react-ga4";
import { useAuthenticationContext } from "../../../contexts/AuthenticationContext";
import { useConfigContext } from "../../../contexts/ConfigurationContext";
import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiTitle,
  VuiTextColor,
  VuiButtonTertiary,
  VuiText,
  VuiButtonPrimary,
} from "../../../ui";
import "./appHeader.scss";

export const AppHeader = () => {
  const { app, appHeader } = useConfigContext();

  const { isAuthEnabled, logOut, user } = useAuthenticationContext();

  return (
    <div className="appHeader">
      <VuiFlexContainer justifyContent="spaceBetween" alignItems="center">
        <VuiFlexItem grow={1}>
          <VuiFlexContainer alignItems="center" wrap={true} spacing="xxs">
            <VuiFlexItem>
              {/* We want this disabled so we can track outbound links. Enabling
          this would add the rel="noopener noreferrer" attribute to the
          link. */}
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a
                href={appHeader.logo.link ?? "https://vectara.com/"}
                target="_blank"
                className="appHeaderLogo"
              >
                <img
                  src={appHeader.logo.src ?? "images/BusinessPic.png"}
                  alt={appHeader.logo.alt ?? "Gavin Diaper"}
                  height={appHeader.logo.height ?? "80"}
                  style={{ marginTop: "1px" }}
                />
              </a>
            </VuiFlexItem>

            <VuiFlexItem grow={1}>
              <VuiTitle size="xs" align="left">
                <VuiTextColor color="subdued">
                  <h1>{app.title ?? "Sample app"} Or Online instant AI Interview</h1>
                </VuiTextColor>
              </VuiTitle>
            </VuiFlexItem>
          </VuiFlexContainer>
        </VuiFlexItem>

        <VuiFlexItem grow={false}>
          <VuiFlexContainer justifyContent="spaceBetween" alignItems="center">
            {isAuthEnabled && (
              <>
                <VuiFlexItem grow={false}>
                  <VuiText size="s">
                    <p>Logged in as {user?.email}</p>
                  </VuiText>
                </VuiFlexItem>
                <VuiFlexItem>
                  <VuiButtonTertiary color="neutral" size="m" onClick={logOut}>
                    Log out
                  </VuiButtonTertiary>
                </VuiFlexItem>
              </>
            )}

            {appHeader.learnMore.link && (
              <VuiFlexItem>
                <VuiButtonTertiary
                  color="primary"
                  size="m"
                  href={appHeader.learnMore.link}
                  target="_blank"
                  onClick={() => {
                    ReactGA.event({
                      category: "Outbound link",
                      action: "click",
                      label: "Learn more",
                    });
                  }}
                >
                  {appHeader.learnMore.text ?? "About"}
                </VuiButtonTertiary>
              </VuiFlexItem>
            )}

            <VuiFlexItem>
              <VuiButtonPrimary
                color="primary"
                size="m"
                href="https://drive.google.com/file/d/12GuGtI1HJ9zRIr4PTZ7CILiaYS6-vCRx/view?usp=sharing"
                target="_blank"
                onClick={() => {
                  ReactGA.event({
                    category: "Outbound link",
                    action: "click",
                    label: "Resume",
                  });
                }}
              >
                Link To My CV
              </VuiButtonPrimary>
            </VuiFlexItem>
          </VuiFlexContainer>
        </VuiFlexItem>
      </VuiFlexContainer>
    </div>
  );
};
