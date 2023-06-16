"use client";
import {
  BackgroundImage1,
  BackgroundImage2,
  Footer,
  GradientBackground,
  FooterLink,
  QuoteGeneratorCon,
  QuoteGeneratorInnerCon,
  QuoteGeneratorModalCon,
  QuoteGeneratorSubTitle,
  QuoteGeneratorTitle,
  QuoteGeneratorModalInnerCon,
  GenerateQuoteButton,
  GenerateQuoteButtonText,
} from "./components/QuotesGenerator";
import storm from "./assets/storm.png";
import cloud from "./assets/clouds.png";
import { useState } from "react";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";

Amplify.configure({ ...awsExports, ssr: true });

export default function Home() {
  const [quotes_number, setQuotes_number] = useState<Number | null>(0);
  return (
    <GradientBackground>
      <BackgroundImage1 src={storm} alt="storm-image" />
      <BackgroundImage2 src={cloud} alt="cloud-image" />

      <QuoteGeneratorCon
      // open={openGenerator}
      // close={handleCloseGenerator}
      // processingQuote={processingQuote}
      // setProcessingQuote={setProcessingQuote}
      // quoteReceived={quoteReceived}
      // setQuoteReceived={setQuoteReceived}
      />

      {/* Quote Generator */}
      <QuoteGeneratorCon>
        <QuoteGeneratorInnerCon>
          <QuoteGeneratorTitle>Daily Inspiration Generator</QuoteGeneratorTitle>

          <QuoteGeneratorSubTitle>
            Looking for a splash of inspiration? Generate a quote card with a
            random inspirational quote provided by{" "}
            <FooterLink
              href="https://zenquotes.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ZenQuotes API
            </FooterLink>
            .
          </QuoteGeneratorSubTitle>

          <GenerateQuoteButton
          //  onClick={handleOpenGenerator}
          >
            <GenerateQuoteButtonText>Make a Quote</GenerateQuoteButtonText>
          </GenerateQuoteButton>
        </QuoteGeneratorInnerCon>
      </QuoteGeneratorCon>

      <Footer>
        <>
          Quotes Generated:{quotes_number}
          <br />
          Developed by{" "}
          <FooterLink
            href={"https://isiakaabd.netlify.app"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Remlad
          </FooterLink>
        </>
      </Footer>
    </GradientBackground>
  );
}
