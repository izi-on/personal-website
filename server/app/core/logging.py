import logging

logger = logging.getLogger("api")

formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")

logger.addHandler(logging.StreamHandler())
