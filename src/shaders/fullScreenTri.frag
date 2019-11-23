precision highp float;
uniform sampler2D uScene;
uniform sampler2D uTextImage;
uniform vec2 uResolution;
uniform float uTime;

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec4 color = texture2D(uScene, uv);
    vec4 textImageColor = texture2D(uTextImage, uv);


    vec4 refractColor1 = texture2D(uTextImage, uv + (color.r * 0.009 * sin(uTime * 0.5) * 1.3));
    vec4 refractColor2 = texture2D(uTextImage, uv + (color.r * 0.013 * sin(uTime * 0.5) * 1.3));
    vec4 refractColor3 = texture2D(uTextImage, uv + (color.r * 0.017 * sin(uTime * 0.5) * 1.3));

    color = vec4(refractColor1.r, refractColor2.g, refractColor3.b, 1.0);

    
    gl_FragColor = vec4(color);
}