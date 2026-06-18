#!/usr/bin/env python3
"""Convert a PDF to an editable DOCX using pdf2docx.

Usage: python3 pdf2docx_convert.py <input.pdf> <output.docx>
"""
import sys

def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: pdf2docx_convert.py <input.pdf> <output.docx>", file=sys.stderr)
        return 2

    input_path, output_path = sys.argv[1], sys.argv[2]

    try:
        from pdf2docx import Converter
    except ImportError:
        print("pdf2docx is not installed (pip install pdf2docx)", file=sys.stderr)
        return 3

    cv = Converter(input_path)
    try:
        cv.convert(output_path)
    finally:
        cv.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
