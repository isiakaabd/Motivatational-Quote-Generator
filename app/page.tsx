"use client";
import {
  BackgroundImage1,
  BackgroundImage2,
  Footer,
  GradientBackgroundCon,
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
import { useEffect, useState } from "react";
import { Amplify, API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import awsExports from "../src/aws-exports";
import { quotesQueryName } from "@/src/graphql/queries";
import QuoteGenerators from "./components/QuoteGenerators";

Amplify.configure({ ...awsExports, ssr: true });

interface UpdateQuoteInfoData {
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}
export default function Home() {
  const [quotes_number, setQuotes_number] = useState<Number | null>(0);
  const [openGenerator, setOpenGenerator] = useState<boolean>(false);
  const [quoteReceived, setQuoteReceived] = useState("");
  const [processingQuote, setProcessingQuote] = useState<boolean>(false);
  const updataQuoteInfo = async () => {
    try {
      const data = await API.graphql<UpdateQuoteInfoData>({
        query: quotesQueryName,
        authMode: "AWS_IAM",
        variables: {
          queryName: "LIVE",
        },
      });
      if (!isGraphQLResultForquotesQueryNAme(data)) {
        throw new Error("Unexpected response from API.graphql");
      }
      if (!data.data) throw new Error("Response data is undefined");
      const recievedNumberOfQuotes =
        data.data.quotesQueryName.items[0].quotesGenerated;
      setQuotes_number(recievedNumberOfQuotes);
    } catch (err) {
      console.log(err);
    }
  };

  function isGraphQLResultForquotesQueryNAme(
    response: any
  ): response is GraphQLResult<{
    quotesQueryName: {
      items: [UpdateQuoteInfoData];
    };
  }> {
    return response?.data?.quotesQueryName?.items;
  }
  const handleCloseGenerator = () => setOpenGenerator(false);
  const handleOpenGenerator = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpenGenerator(true);
  };

  useEffect(() => {
    updataQuoteInfo();
  }, []);

  return (
    <GradientBackgroundCon>
      <BackgroundImage1 src={storm} alt="storm-image" />
      <BackgroundImage2 src={cloud} alt="cloud-image" />
      <QuoteGenerators
        open={openGenerator}
        processingQuote={processingQuote}
        setProcessingQuote={setProcessingQuote}
        quoteReceived={quoteReceived}
        // setQuoteReceived={setQuoteReceived}
        close={handleCloseGenerator}
      />
      {/* <QuoteGeneratorCon
        open={openGenerator}
        close={handleCloseGenerator}
        processingQuote={processingQuote}
        setProcessingQuote={setProcessingQuote}
        quoteReceived={quoteReceived}
        setQuoteReceived={setQuoteReceived}
      /> */}

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

          <GenerateQuoteButton onClick={handleOpenGenerator}>
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
    </GradientBackgroundCon>
  );
}
