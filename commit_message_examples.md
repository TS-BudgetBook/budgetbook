
# commitlint documentation: https://commitlint.js.org/guides/getting-started.html


# Commit Message Examples

Here are some examples of commands similar to `git commit -m "RELEASE_TYPE: major - Updating major feature"` that specify the release type in the commit message:

git commit -m "feat: add commit message examples"

- **Adding a New Feature:**
git commit -m "feat: implement user authentication"

- **Fixing a Bug:**
git commit -m "fix: resolve issue with user profile rendering"

- **Making a Chore or Maintenance Change:**
git commit -m "chore: update dependencies"

- **Making a Refactor or Code Cleanup:**
git commit -m "refactor: optimize database query performance"

- **Reverting a Previous Commit:**
git commit -m "revert: revert changes introduced in commit abc123"

- **Introducing a Breaking Change:**
git commit -m "feat: add new API endpoint (BREAKING CHANGE)"

- **Adding Documentation:**
git commit -m "docs: update installation guide"

- **Adding Tests:**
git commit -m "test: add unit tests for authentication module"

- **Performing a Minor Release:**  
  ```bash
  git commit -m "RELEASE_TYPE: minor - Adding new functionality"

# Performing a Patch Release:
This command is used when fixing a critical bug or issue in the project.

git commit -m "RELEASE_TYPE: patch - Fixing a critical bug"

# Performing a Major Release with Multiple Changes:
This command is used when performing a major release with significant changes to the codebase and adding new features.

git commit -m "RELEASE_TYPE: major - Refactoring codebase and adding new features"

# Performing a Minor Release with Detailed Description:
This command is used when adding a new feature with a detailed description, such as an authentication module for user login.

git commit -m "RELEASE_TYPE: minor - Adding authentication module for user login"

# Performing a Patch Release with Bug Fix Description:
This command is used when fixing a specific bug or issue with a detailed description, such as fixing a null pointer exception in data processing.

git commit -m "RELEASE_TYPE: patch - Fixing null pointer exception in data processing"

# Performing a Major Release with Commit Details:
This command is used when performing a major release with multiple changes, including adding a new database schema, updating API endpoints, and improving performance.

git commit -m "RELEASE_TYPE: major - Adding new database schema, updating API endpoints, and improving performance"

# Performing a Patch Release with Specific Issue Reference:
This command is used when fixing a specific issue with a reference to the issue number, such as fixing incorrect data rendering in the user interface (UI).

git commit -m "RELEASE_TYPE: patch - Fixing issue #123: Incorrect data rendering in UI"


