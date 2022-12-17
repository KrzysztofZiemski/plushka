import { ContactMessage } from "../types/message";

export const createMailBody = ({
  content,
  email,
  title,
}: ContactMessage) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="pl">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="description" content="Wiadomość od Plushka.pl">
  <meta name="author" content="Plushka.pl">
<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />


</head>

<body>
  <div font-family: 'helvetica', 'ui-sans';">              
        </div>
        <div class="container" style="margin-left: 20px;margin-right: 20px;">
        <h3 style={{margin: 10px 5px}}>✉️${email} </h3>
        <p style={{margin:0 5px}}>Wiadomośź:</p>
        <p>${content}</p>
        <br>
        </div>
        </div>
</body>
</html>`;
