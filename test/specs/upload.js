import { fileURLToPath } from 'url';
import path from 'path';

// Ini menggantikan __dirname dalam ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('upload test', () => {
    it('simple upload test', async () => {
        // Open url
        await browser.url('https://the-internet.herokuapp.com/upload');

        // Store test file path
        const filePath = path.join(__dirname, '../data/logotitle.png');

        // upload test file
        const remoteFilePath = await browser.uploadFile(filePath);

        // set file path value in the input field
        await $('#file-upload').setValue(remoteFilePath);
        await $('#file-submit').click(); // click submit button

        // assertion
        await expect($('h3')).toHaveText('File Uploaded!');
        await browser.pause(3000);
    });
    
    it.only('upload on a hidden input field', async () => { 
        // open url
        await browser.url('https://practice.sdetunicorns.com/cart/');
    
        // Store test file path
        const filePath = path.join(__dirname, '../data/logotitle.png');
    
        // upload test file
        const remoteFilePath = await browser.uploadFile(filePath);
    
        // Check if the element exists and remove hidden class
        const isElementPresent = await browser.execute(() => {
            const fileInput = document.querySelector("#upfile_1");
            if (fileInput) {
                fileInput.className = ""; // Remove hidden class
                return true;  // Return true if element is found
            }
            return false; // Return false if element not found
        });
    
        if (!isElementPresent) {
            throw new Error("File input element #upfile_1 not found");
        }
    
        // Set file path value in the input field
        await $('#upfile_1').setValue(remoteFilePath);
        await $('#upload_1').click(); // click submit button
    
        // Get the actual text for assertion
        const uploadedMessage = await $('#wfu_messageblock_header_1_label_1').getText();
    
        // Assertion using standard expect
        expect(uploadedMessage).toContain('uploaded successfully');
    
        await browser.pause(8000);
    });
    
});




