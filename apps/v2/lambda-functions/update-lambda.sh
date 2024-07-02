#!/bin/bash

# Check if a directory name, Lambda function name, and AWS profile were provided as arguments
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]
then
  echo "Usage: $0 <directory> <lambda_function_name> <aws_profile>"
  exit 1
fi

# no-profile -> jet
# geoblocs -> geoblocs

DIRECTORY=$1
LAMBDA_FUNCTION_NAME=$2
AWS_PROFILE=$3

# Check if the directory exists
if [ ! -d "$DIRECTORY" ]
then
  echo "Directory does not exist: $DIRECTORY"
  exit 1
fi

# Define the name of the zip file
ZIP_FILE="$DIRECTORY.zip"

# Navigate to the directory
cd "$DIRECTORY"

# pwd 

# echo $DIRECTORY
# echo $ZIP_FILE

# Start zipping and show a simple progress message
echo "Zipping contents of $DIRECTORY, please wait..."
zip -rq "../zip-files/$ZIP_FILE" . > /dev/null

# Check for successful zip operation
if [ $? -eq 0 ]; then
    echo "Successfully created zip file: $ZIP_FILE"
else
    echo "Failed to create zip file."
    exit 1
fi

# Move back to the original directory
cd ..

# Upload the zip file to AWS Lambda using the specified profile
echo "Uploading $ZIP_FILE to Lambda function $LAMBDA_FUNCTION_NAME using profile $AWS_PROFILE..."
aws lambda update-function-code --function-name $LAMBDA_FUNCTION_NAME --zip-file fileb://zip-files/$ZIP_FILE --profile $AWS_PROFILE

# Check if the Lambda update was successful
if [ $? -eq 0 ]; then
    echo "Successfully updated Lambda function: $LAMBDA_FUNCTION_NAME"
else
    echo "Failed to update Lambda function."
    exit 1
fi
