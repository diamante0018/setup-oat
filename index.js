const core = require("@actions/core")
const exec = require('@actions/exec');
const tc = require("@actions/tool-cache")
const path = require("path")

async function set_executable_permissions(file_path) {
    if (process.platform == "win32") {
        return
    }

    try {
        const linker_path = path.join(file_path, "Linker")
        const unlinker_path = path.join(file_path, "Unlinker")

        await exec.exec(`chmod +x ${linker_path}`)
        await exec.exec(`chmod +x ${unlinker_path}`)
    } catch (error) {
        console.error(`Error setting executable permissions: ${error}`)
    }
}

async function main() {
    const version = core.getInput('version', { required: true })
    const user_path = core.getInput('path', { required: false })

    if (user_path[0] == '/' || user_path[0] == '~') {
        throw new Error("Path must be relative to the workspace")
    }

    const path_prefix = "https://github.com/Laupetin/OpenAssetTools/releases/download/" + "v" + version + "/oat"
    const oat_path = path.join(process.env.GITHUB_WORKSPACE, user_path)

    if (process.platform == "win32") {
        const oat = await tc.downloadTool(path_prefix + "-windows.zip")
        await tc.extractZip(oat, oat_path)
    }
    else if (process.platform == "linux") {
        const oat = await tc.downloadTool(path_prefix + "-linux.tar.gz")
        await tc.extractTar(oat, oat_path)
    }

    core.addPath(oat_path)
    await set_executable_permissions(oat_path)
}

main().catch(err => {
    core.setFailed(`Failed to install OAT: ${err}`);
})
