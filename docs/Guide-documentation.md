# Setting Up the New Documentation Site Locally

To set up and run the documentation site on your local machine, please follow the steps below:

## 1. Create a Virtual Environment

To create a virtual environment named `venv` in your project directory, use the following command:

```bash
python3 -m venv venv
```

## 2. Activate the Virtual Environment

Activate the virtual environment to ensure that all dependencies are installed locally within your project directory.

On Linux/MacOS:

```
source venv/bin/activate
```

On Windows:

```
venv\Scripts\activate
```

## 3. Install Dependencies

To install all the necessary Python packages listed in requirements.txt, run:

```
pip install -r requirements.txt
```

Please run these commands to update and fetch the local Submodules.

```
git submodule foreach --recursive 'git fetch --all'
git submodule update --init --remote --recursive --depth 1
git submodule sync --recursive
git submodule update --remote --recursive
```

## 4. Serve the Documentation Locally

Start a local development server to preview the documentation in your web browser. The server will automatically reload whenever you make changes to the documentation files.

```
mkdocs serve
```

## 5. Make Changes and Review

As you edit the documentation, you can view your changes in real-time through the local server. This step ensures everything looks as expected before deploying.

## 6. Push Changes to GitHub

Once you are satisfied with your changes, commit and push them to the GitHub repository. The documentation will be automatically deployed via GitHub Actions, making it live on the documentation site.
