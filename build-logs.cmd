
That’s because the output is not on the standard output but the standard error stream. So you can try this to redirect everything into the file:

docker build --no-cache --progress=plain  . &> build.log

or just redirect standard error if you think there should be some other output to show in the terminal

docker build --no-cache --progress=plain  . 2> build.log

Or you can use tee to show the logs and also save it to a file

docker build --no-cache --progress=plain . 2>&1 | tee build.log

If you want to append new logs and not to overwrite on every build, use >> for the redirection as you did originally. If you choose the version with tee, you can use tee -a to append the new logs


docker compose --progress=plain build --no-cache