
import re

logo_content = r"""<svg version="1.1" id="MainLogo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1084.38 385.49" style="width: 100%; height: auto; overflow: visible;">
    <style>
        /* --- ANIMATION LOGIC INSIDE SVG --- */

        /* 1. Icon Animation (Elastic Pop) */
        #Icon-Group path {
            opacity: 0;
            transform-origin: center center;
            animation: elasticPop 1.0s cubic-bezier(0.2, 1.1, 0.5, 1) forwards;
        }

        /* Icon Staggering */
        #Icon-Group path:nth-child(1) { animation-delay: 0.05s; } 
        #Icon-Group path:nth-child(2) { animation-delay: 0.1s; } 
        #Icon-Group path:nth-child(3) { animation-delay: 0.2s; } 
        #Icon-Group path:nth-child(4) { animation-delay: 0.2s; } 
        #Icon-Group path:nth-child(5) { animation-delay: 0.25s; } 
        #Icon-Group path:nth-child(6) { animation-delay: 0.25s; }
        #Icon-Group path:nth-child(7) { animation-delay: 0.3s; } 
        #Icon-Group path:nth-child(8) { animation-delay: 0.35s; }
        #Icon-Group path:nth-child(9) { animation-delay: 0.3s; } 

        /* Icon Floating Loop */
        #Icon-Group {
            animation: hoverFloat 4s ease-in-out infinite;
            animation-delay: 1.5s;
        }

        /* 2. Text Animation (Slide Up) */
        #Text-Group path {
            opacity: 0;
            transform: translateY(40px);
            animation: slideUpFade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Text Staggering (Optimized Timing) */
        #Text-Group path:nth-child(1) { animation-delay: 0.85s; } /* A */
        #Text-Group path:nth-child(2) { animation-delay: 1.0s; }  /* s */
        #Text-Group path:nth-child(3) { animation-delay: 1.05s; } /* a */
        #Text-Group path:nth-child(4) { animation-delay: 1.1s; }  /* b */
        #Text-Group path:nth-child(5) { animation-delay: 1.15s; } /* e */
        #Text-Group path:nth-child(6) { animation-delay: 1.2s; }  /* l */
        #Text-Group path:nth-child(7) { animation-delay: 1.25s; } /* l */
        #Text-Group path:nth-child(8) { animation-delay: 1.3s; }  /* a */

        /* Keyframes */
        @keyframes elasticPop {
            0% { opacity: 0; transform: scale(0.5); }
            100% { opacity: 1; transform: scale(1); }
        }

        @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes hoverFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); filter: brightness(1.1); }
        }
    </style>

    <defs>
        <linearGradient id="grad_1" gradientUnits="userSpaceOnUse" x1="272.1992" y1="290.2769" x2="272.1992" y2="178.1201"><stop offset="0" style="stop-color:#1DFFC2"/><stop offset="0.9142" style="stop-color:#1C84FF"/></linearGradient>
        <linearGradient id="grad_2" gradientUnits="userSpaceOnUse" x1="284.0464" y1="276.45" x2="284.0464" y2="178.1201"><stop offset="0" style="stop-color:#00CFC4"/><stop offset="0.7063" style="stop-color:#3560E1"/><stop offset="1" style="stop-color:#4C30ED"/></linearGradient>
        <linearGradient id="grad_3" gradientUnits="userSpaceOnUse" x1="305.4634" y1="119.0465" x2="305.4634" y2="162.2582"><stop offset="0" style="stop-color:#C33BF1"/><stop offset="0.9106" style="stop-color:#7937E0"/></linearGradient>
        <linearGradient id="grad_4" gradientUnits="userSpaceOnUse" x1="302.6435" y1="95.2118" x2="302.6435" y2="125.6344"><stop offset="0" style="stop-color:#C33BF1"/><stop offset="1" style="stop-color:#7937E0"/></linearGradient>
        <linearGradient id="grad_5" gradientUnits="userSpaceOnUse" x1="271.3676" y1="106.5894" x2="271.3676" y2="164.7217"><stop offset="0" style="stop-color:#C33BF1"/><stop offset="0.2201" style="stop-color:#BF3AF1"/><stop offset="0.4596" style="stop-color:#B139F1"/><stop offset="0.7074" style="stop-color:#9C36F0"/><stop offset="0.8733" style="stop-color:#8934F0"/></linearGradient>
        <linearGradient id="grad_6" gradientUnits="userSpaceOnUse" x1="267.0694" y1="106.5907" x2="267.0694" y2="164.7219"><stop offset="0" style="stop-color:#A62AEB"/><stop offset="0.2887" style="stop-color:#A22BEA"/><stop offset="0.6029" style="stop-color:#942FE7"/><stop offset="0.9281" style="stop-color:#7F35E1"/><stop offset="1" style="stop-color:#7937E0"/></linearGradient>
    </defs>

    <g id="Text-Group">
        <path fill="#FFFFFF" d="M105.8,281.96l50.61-130.15h22.93l50.61,130.15h-18.58l-14.04-37.03h-58.91l-14.04,37.03H105.8z M144.15,229.53h47.44l-23.72-63.97L144.15,229.53z"/>
        <path fill="#FFFFFF" d="M374.66,284.16c-9.36,0-17.3-1.41-23.82-4.22c-6.52-2.81-11.6-6.69-15.22-11.64c-3.63-4.95-5.7-10.6-6.23-16.95l17.4-1.1c1.05,5.87,3.76,10.54,8.1,14.02c4.35,3.48,10.94,5.23,19.77,5.23c7.12,0,12.81-1.07,17.1-3.21c4.28-2.14,6.42-5.59,6.42-10.36c0-2.57-0.66-4.7-1.98-6.42c-1.32-1.71-3.89-3.21-7.71-4.49c-3.82-1.28-9.49-2.54-17-3.76c-10.02-1.71-17.89-3.82-23.62-6.32c-5.73-2.5-9.82-5.62-12.26-9.35c-2.44-3.73-3.66-8.16-3.66-13.29c0-8.68,3.43-15.79,10.28-21.36c6.85-5.56,16.61-8.34,29.26-8.34c8.57,0,15.78,1.44,21.65,4.31c5.86,2.87,10.48,6.66,13.84,11.36c3.36,4.71,5.57,9.87,6.62,15.49l-17.4,1.1c-0.79-3.42-2.24-6.44-4.35-9.07c-2.11-2.63-4.88-4.7-8.3-6.23c-3.43-1.53-7.51-2.29-12.26-2.29c-7.51,0-13.05,1.35-16.6,4.03c-3.56,2.69-5.34,6.11-5.34,10.27c0,3.18,0.82,5.77,2.47,7.79c1.65,2.02,4.32,3.67,8.01,4.95c3.69,1.28,8.63,2.41,14.83,3.39c10.67,1.71,18.98,3.79,24.91,6.23c5.93,2.45,10.08,5.44,12.45,8.98c2.37,3.55,3.56,7.88,3.56,13.02c0,5.99-1.81,11.09-5.44,15.31c-3.63,4.22-8.5,7.42-14.63,9.62C389.39,283.06,382.44,284.16,374.66,284.16z"/>
        <path fill="#FFFFFF" d="M471.13,284.16c-10.81,0-19.41-2.32-25.8-6.97c-6.39-4.64-9.59-11.12-9.59-19.43c0-8.31,2.63-14.85,7.91-19.61c5.27-4.77,13.64-8.13,25.11-10.08l37.16-6.42c0-8.19-2.08-14.3-6.23-18.33c-4.15-4.03-10.38-6.05-18.68-6.05c-7.25,0-12.98,1.5-17.2,4.49c-4.22,3-7.12,7.3-8.7,12.92l-17.59-1.28c1.98-9.16,6.75-16.59,14.33-22.27c7.58-5.68,17.3-8.52,29.16-8.52c13.44,0,23.72,3.51,30.84,10.54c7.12,7.03,10.68,16.71,10.68,29.05v40.14c0,2.2,0.43,3.76,1.28,4.67c0.86,0.92,2.27,1.37,4.25,1.37h4.15v13.56c-0.53,0.12-1.38,0.21-2.57,0.28c-1.19,0.06-2.44,0.09-3.76,0.09c-4.74,0-8.6-0.7-11.56-2.11c-2.97-1.4-5.11-3.6-6.42-6.6c-1.32-2.99-1.98-6.93-1.98-11.82l1.98,0.37c-0.92,4.16-3.16,7.91-6.72,11.27c-3.56,3.36-7.98,5.99-13.25,7.88C482.66,283.21,477.06,284.16,471.13,284.16z M472.71,270.59c6.98,0,12.95-1.25,17.89-3.76c4.94-2.5,8.73-5.93,11.37-10.27c2.64-4.34,3.95-9.19,3.95-14.57v-6.96l-34,5.87c-7.12,1.22-12.03,3.09-14.73,5.59c-2.7,2.51-4.05,5.77-4.05,9.81c0,4.52,1.75,8.04,5.24,10.54C461.87,269.34,466.65,270.59,472.71,270.59z"/>
        <path fill="#FFFFFF" d="M600.22,284.16c-7.25,0-13.71-1.5-19.37-4.49c-5.67-2.99-10.02-7.12-13.05-12.37l-0.59,14.66h-15.02V151.81h16.6v46.56c2.63-4.03,6.72-7.67,12.26-10.91c5.54-3.24,11.93-4.86,19.18-4.86c9.22,0,17.2,2.08,23.92,6.23c6.72,4.16,11.93,10.02,15.62,17.6c3.69,7.58,5.53,16.56,5.53,26.95c0,10.39-1.85,19.37-5.53,26.95c-3.69,7.58-8.9,13.44-15.62,17.6C617.42,282.08,609.44,284.16,600.22,284.16z M599.23,269.49c8.83,0,15.81-3.24,20.95-9.72c5.14-6.48,7.71-15.27,7.71-26.4c0-11.24-2.57-20.07-7.71-26.49c-5.14-6.42-11.99-9.62-20.56-9.62c-6.46,0-11.99,1.44-16.61,4.31c-4.61,2.87-8.14,7-10.58,12.37c-2.44,5.38-3.66,11.85-3.66,19.43c0,7.33,1.22,13.72,3.66,19.16c2.44,5.44,5.93,9.62,10.48,12.56C587.47,268.03,592.9,269.49,599.23,269.49z"/>
        <path fill="#FFFFFF" d="M710.72,284.16c-9.88,0-18.42-2.08-25.6-6.23c-7.18-4.15-12.72-10.05-16.6-17.69c-3.89-7.64-5.83-16.59-5.83-26.85c0-10.26,1.94-19.18,5.83-26.76c3.89-7.58,9.36-13.47,16.41-17.69c7.05-4.22,15.39-6.32,25.01-6.32c9.09,0,17.13,1.99,24.12,5.96c6.98,3.97,12.42,9.75,16.31,17.32c3.89,7.58,5.83,16.8,5.83,27.68v4.58h-76.11c0.66,10.39,3.66,18.21,8.99,23.46c5.34,5.26,12.55,7.88,21.65,7.88c6.85,0,12.49-1.5,16.9-4.49c4.41-2.99,7.48-6.93,9.19-11.82l17.79,1.28c-2.77,8.68-8.01,15.8-15.72,21.35C731.18,281.38,721.79,284.16,710.72,284.16z M680.08,224.58H738c-0.79-9.41-3.72-16.31-8.8-20.71c-5.07-4.4-11.5-6.6-19.27-6.6c-8.04,0-14.66,2.29-19.87,6.87C684.86,208.73,681.53,215.54,680.08,224.58z"/>
        <path fill="#FFFFFF" d="M802.25,281.96c-6.06,0-11.01-1.47-14.83-4.4c-3.82-2.93-5.73-7.58-5.73-13.93V151.81h16.6v110.53c0,1.96,0.56,3.45,1.68,4.49c1.12,1.04,2.73,1.56,4.84,1.56h9.09v13.56H802.25z"/>
        <path fill="#FFFFFF" d="M855.03,281.96c-6.06,0-11.01-1.47-14.83-4.4c-3.82-2.93-5.73-7.58-5.73-13.93V151.81h16.6v110.53c0,1.96,0.56,3.45,1.68,4.49c1.12,1.04,2.73,1.56,4.84,1.56h9.09v13.56H855.03z"/>
        <path fill="#FFFFFF" d="M917.5,284.16c-10.81,0-19.41-2.32-25.8-6.97c-6.39-4.64-9.59-11.12-9.59-19.43c0-8.31,2.63-14.85,7.91-19.61c5.27-4.77,13.64-8.13,25.11-10.08l37.16-6.42c0-8.19-2.08-14.3-6.23-18.33c-4.15-4.03-10.38-6.05-18.68-6.05c-7.25,0-12.98,1.5-17.2,4.49c-4.22,3-7.12,7.3-8.7,12.92l-17.59-1.28c1.98-9.16,6.75-16.59,14.33-22.27c7.58-5.68,17.3-8.52,29.16-8.52c13.44,0,23.72,3.51,30.84,10.54c7.12,7.03,10.68,16.71,10.68,29.05v40.14c0,2.2,0.43,3.76,1.28,4.67c0.86,0.92,2.27,1.37,4.25,1.37h4.15v13.56c-0.53,0.12-1.38,0.21-2.57,0.28c-1.19,0.06-2.44,0.09-3.76,0.09c-4.74,0-8.6-0.7-11.56-2.11c-2.97-1.4-5.11-3.6-6.42-6.6c-1.32-2.99-1.98-6.93-1.98-11.82l1.98,0.37c-0.92,4.16-3.16,7.91-6.72,11.27c-3.56,3.36-7.98,5.99-13.25,7.88C929.03,283.21,923.43,284.16,917.5,284.16z M919.08,270.59c6.98,0,12.95-1.25,17.89-3.76c4.94-2.5,8.73-5.93,11.37-10.27c2.64-4.34,3.95-9.19,3.95-14.57v-6.96l-34,5.87c-7.12,1.22-12.03,3.09-14.73,5.59c-2.7,2.51-4.05,5.77-4.05,9.81c0,4.52,1.75,8.04,5.24,10.54C908.24,269.34,913.02,270.59,919.08,270.59z"/>
    </g>

    <g id="Icon-Group">
        <path fill="url(#grad_1)" d="M234.72,217.67c-0.89,0.78-2.18-0.31-1.56-1.32c3.26-5.32,7.61-11.1,16.61-19.99c15.31-15.12,28.56-21.22,37.54-16.86c9.67,4.69,14.73,15.5,7.75,44.37s-8.14,33.91-8.14,37.59s2.91,13.37,13.56,0.97c4.45-5.18,6.93-8.71,8.7-10.76c1.72-1.98,2.42-0.31,2.15,0.97c-0.76,3.59-2.82,7.92-8.91,17.15c-10.22,15.5-25.77,26.69-42.05,16.66c-8.59-5.29-11.48-21.51-4.26-40.11l10.85-28.87c0,0,7.61-21.85-0.19-22.07c-7.94-0.22-17.95,10.17-26.16,17.12L234.72,217.67z"/>
        <path style="fill:url(#grad_2);" d="M309.19,251.68c-1.77,2.05-4.25,5.58-8.7,10.76c-10.66,12.4-13.56,2.71-13.56-0.97s1.16-8.72,8.14-37.59c6.98-28.87,1.92-39.68-7.75-44.37c-7.6-3.69-18.26,0.11-30.62,10.52c5.27-3.36,12.36-6.73,17.54-4.8c8.62,3.2,12.4,12.01,5.72,41.18l-5.52,20.25c0,0-7.36,22.57,2.42,28c7.54,4.18,17.01,0.73,26.57-6.36c5.32-8.2,7.2-12.25,7.91-15.63C311.61,251.37,310.91,249.69,309.19,251.68z"/>
        <path style="fill:url(#grad_3);" d="M292.26,162.26c0,0,2.99-6,4.55-12.3c3.2-12.89,7.27-23.83,21.8-30.91c0,0,2.03,14.05-17.34,34.1C298.45,156.07,295.07,159.55,292.26,162.26z"/>
        <path style="fill:#5F29D1;" d="M301.27,153.15c2.35-2.43,4.38-4.78,6.14-7.02c2.72-7.8,1.9-10.91,1.9-10.91s-6.31,5.64-9.16,11.14c-2.14,4.14-4.29,8.2-5.7,10.84c-1.17,2.98-2.19,5.05-2.19,5.05C295.07,159.55,298.45,156.07,301.27,153.15z"/>
        <path style="fill:url(#grad_4);" d="M298.6,125.63c0,0-8.33-17.44,7.07-30.42C305.68,95.21,316.53,107.61,298.6,125.63z"/>
        <path style="fill:#5F29D1;" d="M303.1,120.47c2.3-5.89,0.64-10.73,0.64-10.73c-4.43,3.82-5.59,10-5.84,14.08c0.39,1.15,0.7,1.81,0.7,1.81C300.37,123.86,301.85,122.13,303.1,120.47z"/>
        <path style="fill:url(#grad_5);" d="M281.59,164.72c0,0-19.91-5.09-27.03-21.36s1.16-31.54,5.81-36.77c0,0,20.35,1.6,27.03,15.99s2.33,29.65-0.15,37.64c0,0-0.15-10.75-4.36-18.89c-3.47-6.69-6.58-9.24-11.24-11.58c-1.13-0.57-2.29,0.49-1.49,1.46c2.66,3.25,6.96,7.32,10.26,15.64C283.93,155.68,281.59,164.72,281.59,164.72z"/>
        <path style="fill:url(#grad_6);" d="M254.56,143.36c7.12,16.28,27.03,21.36,27.03,21.36s2.34-9.04-1.16-17.88c-3.3-8.32-7.6-12.38-10.26-15.64c-0.72-0.88,0.15-1.8,1.15-1.58c-4.15-11.06-9.42-20.43-10.94-23.04C255.72,111.82,247.44,127.08,254.56,143.36z"/>
        <path style="fill:#5F29D1;" d="M280.43,146.85c-3.3-8.32-7.6-12.38-10.26-15.64c-0.4-0.49-0.31-0.99,0.02-1.3c-1.22,0.98-4.29,4.74-2.24,16.99c1.47,8.74,7.5,14.35,11.29,17.09c1.46,0.51,2.35,0.74,2.35,0.74S283.93,155.68,280.43,146.85z"/>
    </g>
</svg>"""

def generate_logo(prefix, main_id):
    content = logo_content
    
    # Replace Main ID
    content = content.replace('id="MainLogo"', f'id="{main_id}"')
    
    # Replace IDs and references
    ids_to_replace = [
        "Icon-Group", "Text-Group", 
        "grad_1", "grad_2", "grad_3", "grad_4", "grad_5", "grad_6",
        "elasticPop", "slideUpFade", "hoverFloat"
    ]
    
    for id_name in ids_to_replace:
        new_id = f"{prefix}-{id_name}"
        # Replace ID definitions: id="Icon-Group" -> id="Header-Icon-Group"
        content = content.replace(f'id="{id_name}"', f'id="{new_id}"')
        # Replace CSS selectors: #Icon-Group -> #Header-Icon-Group
        content = content.replace(f'#{id_name}', f'#{new_id}')
        # Replace URL references: url(#grad_1) -> url(#Header-grad_1)
        content = content.replace(f'url(#{id_name})', f'url(#{new_id})')
        # Replace animation names in CSS: animation: elasticPop -> animation: Header-elasticPop
        content = content.replace(f'animation: {id_name}', f'animation: {new_id}')
        # Replace keyframes: @keyframes elasticPop -> @keyframes Header-elasticPop
        content = content.replace(f'@keyframes {id_name}', f'@keyframes {new_id}')
        
    # Add class to SVG to match existing styling
    # Existing: class="block h-8 md:h-10 w-auto"
    # The new logo has style="width: 100%; height: auto; overflow: visible;"
    # We should probably merge them or replace the style with the class.
    # The user wants to replace the animation, but probably keep the size.
    # The existing logo has `viewBox="0 0 800 200"`. The new one has `viewBox="0 0 1084.38 385.49"`.
    # I should keep the class `block h-8 md:h-10 w-auto` to ensure it fits in the header/footer.
    # And remove the inline style `width: 100%; height: auto; overflow: visible;` or adjust it.
    
    content = content.replace('style="width: 100%; height: auto; overflow: visible;"', 'class="block h-8 md:h-10 w-auto"')
    
    return content

header_logo = generate_logo("Header", "HeaderLogo")
footer_logo = generate_logo("Footer", "FooterLogo")

# Now replace in files
files = [
    "c:\\business\\AIsabella\\Website\\Github_AIsabella\\AIsabella-ai-website\\index.html",
    "c:\\business\\AIsabella\\Website\\Github_AIsabella\\AIsabella-ai-website\\privacy.html",
    "c:\\business\\AIsabella\\Website\\Github_AIsabella\\AIsabella-ai-website\\praxis.html",
    "c:\\business\\AIsabella\\Website\\Github_AIsabella\\AIsabella-ai-website\\imprint.html",
    "c:\\business\\AIsabella\\Website\\Github_AIsabella\\AIsabella-ai-website\\404.html"
]

for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex to find existing HeaderLogo SVG
        # It starts with <svg ... id="HeaderLogo" ...> and ends with </svg>
        # We need to be careful with regex matching nested tags, but SVG usually doesn't contain nested SVGs in this context.
        
        # Pattern for HeaderLogo
        # We look for <svg [^>]*id="HeaderLogo"[^>]*> ... </svg>
        # Using dotall to match newlines.
        
        header_pattern = re.compile(r'<svg[^>]*id="HeaderLogo"[^>]*>.*?</svg>', re.DOTALL)
        if header_pattern.search(content):
            content = header_pattern.sub(header_logo, content)
        else:
            print(f"HeaderLogo not found in {file_path}")

        # Pattern for FooterLogo
        footer_pattern = re.compile(r'<svg[^>]*id="FooterLogo"[^>]*>.*?</svg>', re.DOTALL)
        if footer_pattern.search(content):
            content = footer_pattern.sub(footer_logo, content)
        else:
            print(f"FooterLogo not found in {file_path}")
            
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Updated {file_path}")
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

