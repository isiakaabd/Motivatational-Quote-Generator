"use client";
import {
  BackgroundImage1,
  BackgroundImage2,
  Footer,
  GradientBackgroundCon,
  FooterLink,
  QuoteGeneratorCon,
  QuoteGeneratorInnerCon,
  QuoteGeneratorSubTitle,
  QuoteGeneratorTitle,
  GenerateQuoteButton,
  GenerateQuoteButtonText,
} from "./components/QuotesGenerator";
import storm from "./assets/storm.png";
import cloud from "./assets/clouds.png";
import { useEffect, useState } from "react";
import { Amplify, API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import awsExports from "../src/aws-exports";
import { generateAQuote, quotesQueryName } from "@/src/graphql/queries";
import QuoteGenerators from "./components/QuoteGenerators";

Amplify.configure({ ...awsExports, ssr: true });

interface GenerateAQuoteData {
  generateAQuote: {
    statusCode: number;
    headers: { [key: string]: string };
    body: string;
  };
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}
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
  const [quoteReceived, setQuoteReceived] = useState<String | null>(null);
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
      if (!data?.data) throw new Error("Response data is undefined");

      const recievedNumberOfQuotes =
        data?.data?.quotesQueryName?.items[0]?.quotesGenerated;
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
  const handleCloseGenerator = () => {
    setOpenGenerator(false);
    setProcessingQuote(false);
    setQuoteReceived(null);
  };
  const handleOpenGenerator = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpenGenerator(true);
    setProcessingQuote(true);
    try {
      //run function
      const runFunction = JSON.stringify("runFunction");
      const response = await API.graphql<GenerateAQuoteData>({
        query: generateAQuote,
        authMode: "AWS_IAM",
        variables: {
          input: runFunction,
        },
      });
      const stringifiedResponse = JSON.stringify(response);
      const runss = JSON.stringify(stringifiedResponse);
      const bodyIndex = runss.indexOf("body=") + 5;
      const bodyAndBase64 = runss.substring(bodyIndex);
      const bodyArray = bodyAndBase64.split(",");
      const body = bodyArray[0];
      setQuoteReceived(body);
      setProcessingQuote(false);
    } catch (e) {
      console.error(e);
      setProcessingQuote(false);
    }
  };

  useEffect(() => {
    updataQuoteInfo();
    //eslint-disable-next-line
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
        close={handleCloseGenerator}
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
