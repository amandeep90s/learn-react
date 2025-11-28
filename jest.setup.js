/* eslint-disable no-undef */
import { TextEncoder, TextDecoder } from "util";
import "@testing-library/jest-dom";

// Polyfill for TextEncoder/TextDecoder required by react-router-dom v7
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
