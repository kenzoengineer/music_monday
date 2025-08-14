import ffmpeg
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

W, H = 300, 300
PAD = 52
W_PAD = W
H_PAD = H + PAD


def perform_gif_overlay(URL):
    input_img = ffmpeg.input(
        URL,
    )

    overlay_gif = input_img.filter("scale", W, H)

    overlay_gif = overlay_gif.filter("pad", W_PAD, H_PAD, 0, 0)

    overlay_gif = overlay_gif.filter(
        "perspective",
        x0="0",
        y0="0",
        x1=str(117),
        y1="36",
        x2="100",
        y2=str(414),
        x3=str(202),
        y3=str(374),
        sense="destination",
    )

    mask_alpha = (
        ffmpeg.input(os.path.join(BASE_DIR, "mask_bw.png"))
        .filter("format", "gray")  # grayscale from black/white
        .filter("format", "yuva444p")  # add alpha channel
        .filter("colorchannelmixer", aa=1.0)  # set alpha from luma
    )

    # Merge alpha into base
    masked = ffmpeg.filter([overlay_gif, mask_alpha], "alphamerge")

    monitor = ffmpeg.input(os.path.join(BASE_DIR, "hunched.jpg"))

    combined = ffmpeg.overlay(monitor, masked, x=182, y=129)

    # ffmpeg.output(combined, "output.gif", loop=0).run()
    out_bytes, _ = ffmpeg.output(combined, "pipe:", format="gif", loop=0).run(
        capture_stdout=True
    )
    return out_bytes
