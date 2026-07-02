from app.services.image_model import predict_image
from app.services.audio_model import predict_audio


# --------------------------------------------------
# Decision Level Fusion
# --------------------------------------------------

def multimodal_prediction(image_path, audio_path):

    image_result = predict_image(image_path)

    audio_result = predict_audio(audio_path)

    image_behaviour = image_result["behaviour"].lower()
    audio_behaviour = audio_result["behaviour"].lower()

    image_confidence = image_result["confidence"]
    audio_confidence = audio_result["confidence"]

    # -----------------------------------------------
    # Fusion Rules
    # -----------------------------------------------

    if image_behaviour == "happy":

        if audio_behaviour == "bark":
            final = "Happy"

        elif audio_behaviour == "growl":
            final = "Defensive"

        else:
            final = "Happy"

    elif image_behaviour == "alert":

        if audio_behaviour == "growl":
            final = "Aggressive"

        elif audio_behaviour == "bark":
            final = "Alert"

        else:
            final = "Alert"

    elif image_behaviour == "relax":

        if audio_behaviour == "growl":
            final = "Suspicious"

        elif audio_behaviour == "bark":
            final = "Relaxed"

        else:
            final = "Relaxed"

    elif image_behaviour == "angry":

        final = "Aggressive"

    elif image_behaviour == "frown":

        if audio_behaviour == "growl":
            final = "Aggressive"

        else:
            final = "Anxious"

    else:

        final = image_behaviour.capitalize()

    final_confidence = round(
        (image_confidence + audio_confidence) / 2,
        2
    )

    return {

        "image_prediction": image_result,

        "audio_prediction": audio_result,

        "final_behaviour": final,

        "confidence": final_confidence

    }